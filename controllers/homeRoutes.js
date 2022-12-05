const router = require('express').Router();
const { Post, User, Comment, Like} = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// Get all Posts
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll ({
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
                {
                    model: Like,
                }
            ],
            order: [['created_at', 'DESC']],
        });

        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('homepage', 
            { posts, 
            loggedIn: req.session.loggedIn,
            loggedOut: !req.session.loggedIn,
            username: req.session.username,        
            userId: req.session.userId            
            });                                         
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get one post
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {id: req.params.id},
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
                    required: true,
                    attributes: ['username'],
                },
                {
                    model: Like,
                },
            ],
        });
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            post.comments.map((e) => 
                (e.loggedIn = req.session.loggedIn && e.userId === req.session.userId)
            );
            post.like = post.likes.filter((e) => e.userId === req.session.userId).length > 0;

            res.render('onepost', { 
                post, 
                comments: post.comments,
                loggedIn: req.session.loggedIn,
                loggedOut: !req.session.loggedIn,
                username: req.session.username,
                userId: req.session.userId,
                onepost: true,
            });
        } else {            
            res.status(404).json({ message: "This user has no post." });
            return;
        }
    } catch (err) {
        console.log("ISSUE " + err);
        res.status(500).json(err);
    }
});

// Login
router.get('/login', (req, res) => {
    try {
        res.render('login', {
          login: true,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Signup
router.get('/signup', (req, res) => {
try {
    res.render('signup', {
        signup: true,
    });
} catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;