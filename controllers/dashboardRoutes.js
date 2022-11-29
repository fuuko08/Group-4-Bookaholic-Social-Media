const router = require('express').Router();
const { User, Post, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// Show all posts on dashboard
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { userId: req.session.userId },
            attributes: ['id', 'title', 'content', 'image', 'created_at'],
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
                {
                    model: Like,
                    attributes: ['like'],
                },
            ],
        }); 
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: true,
            username: req.session.username, });
    } catch (err) {
        res.status(500).json(err);
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
            attributes: ['id', 'title', 'content', 'image', 'created_at'],
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
                {
                    model: Like,
                    attributes: ['like'],
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

