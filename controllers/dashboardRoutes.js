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
        res.render('allposts', {
            layout: 'dashboard',
            posts,
        })
    } catch (err) {
        res.redirect('login');
    }
});

// Click on the "New Post" button
router.get('/new', withAuth, (req, res) => {
    res.render('newpost', {
        layout: 'dashboard',
    });
});

// Click on the post to edit it
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id);
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            res.render('editpost', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});


module.exports = router;