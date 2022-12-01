const router = require('express').Router();
const { Post, User, Comment,} = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// Get all Posts
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll ({
            attributes: ['id', 'like', 'content', 'image', 'created_at'],
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
        });

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', 
            { posts, 
            loggedIn: req.session.loggedIn,
            username: req.session.username,                    
            like: res.session.like}); //double check                                        
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get one post
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'like', 'content', 'image', 'created_at'],
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
        });
        if (dbPostData) {
            const posts = dbPostData.get({ plain: true });

            res.render('onepost', { 
                posts, 
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                like: req.session.like, 
            });
        } else {
            res.status(404).json({ message: "This user has no post." });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get comments on the post
router.get('/post-comment', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'like', 'content', 'image', 'created_at'],
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
        });
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            res.render('post-comment', {
                post, 
                loggedIn: req.session.loggedIn,
                username: req.session.username,
            });
        } else {
            res.status(404).json({ message: "This user has no post." });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;