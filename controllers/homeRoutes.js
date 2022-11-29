const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all Posts
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll ({
            include: [User]
        })
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', { posts, loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get one post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {id: req.params.id},
            include: [
                User, 
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        if (dbPostData) {
            const posts = dbPostData.get({ plain: true });

            res.render('onepost', { posts, loggedIn: req.session.loggedIn})
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// Signup
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

module.exports = router;