const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Show all posts on dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {"userId": req.session.userId},
            include: [User]
        }); 
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('all-posts', {
            layout: 'dashboard',
            posts,
        })
    } catch (err) {
        res.redirect('login');
    }
});

