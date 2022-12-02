const router = require('express').Router();
const { User, Post, Comment, Like} = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// Show all posts on dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { userId: req.session.userId, },
            attributes: ['id', 'content', 'image', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
                    include: {
                        model: User,
                        required: true,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Like,
                }
            ],
            order: [['updatedAt', 'DESC']],
        }); 

        const posts = dbPostData.map((post) => post.get({ plain: true }));
        posts.map((e) => (e.like = e.likes.filter((e) => e.userId === req.session.user.id).length > 0));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            loggedOut: !req.session.loggedIn,
            username: req.session.username, 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User page
router.get('/user/:id', withAuth, async (req, res) => {
    try {
        const findUser = await User.findByPk(req.params.id, {
            attributes: ['username'],
            include: [
                {
                    model: Post,
                    order: [['updatedAt', 'DESC']],
                    include: [{ model: Like }],
                },
                {
                    model: Comment,
                },
            ]
        });
        userData = findUser.get({ plain: true });
        const postArr = userData.posts;
        const postNum = postArr.length;
        let likeNum = 0;
        postArr.forEach((onepost) => {
            likeNum += onepost.likes.length;           
        });
        const commentNum = userData.comments.length;

        res.render('userpage', {
            userId: userData.id,
            image: userData.image,
            name: userData.username,
            postArr,
            likeNum,
            commentNum,
            postNum,
            loggedIn: req.session.loggedIn,
            loggedOut: !req.session.loggedIn,
            username: req.session.username, 
        });
    } catch (error) {
        res.send(error.message);
        res.status(500).json({ msg: error });
    }
});

// Click on the "New Post" button
router.get('/new', (req, res) => {
    res.render('newpost', {
        username: req.session.username,
    });
});

// Click on the post to edit it
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id, },
            attributes: ['id', 'content', 'image', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        })
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            res.render('editpost', {
                post,
                loggedIn: true,
                username: req.session.username
            });
        } else {
            res.status(404).json({ message: "This user has no post." });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

