const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth'); //we need to utilize this middleware

// Get all the comments from all posts
router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        if (commentData.length === 0) {
            res.status(404).json({ message: "You have no comment."});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all the comments from 1 post
router.get('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: { id: req.params.id },
        });
        if (commentData.length === 0) {
            res.status(404).json({ message: `The id ${req.params.id} has no comment.` });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create comments
router.post("/", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body, //this can replace the comment and postId from the body
            userId : req.session.userId, //syntax
        });
        res.status(200).json(commentData);
    }catch(err){
        res.status(400).json(err);
    }    
});  

// Update comments
router.put('/:id', withAuth, async (req,res) =>{ // we update comment from 1 post at a time, not all posts
    try {
        const commentData = await Comment.create(
        {// only edit comment. userid and postid stay the same
            comment : req.body.comment,
        },
        {
            where : {
                id: req.params.id, //syntax
            },
        }
    );
    if (!commentData) { //add this, in case there is no comment at all
        res.status(404).json({ message: `The id ${req.params.id} has no comment.` });
        return;
        }
        res.status(200).json(commentData);
    }catch (err) {
        res.status(400).json(err)
    }
});

// delete comments
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: { id: req.params.id },
        });
        if (!commentData) {
            res.status(404).json({ message: `no comment associates with the id ${res.params.id}` });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; // export directly to router, you already called the route in index.js