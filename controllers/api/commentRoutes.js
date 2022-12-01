const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth'); 

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
            ...req.body, 
            userId : req.session.userId, 
        });
        res.status(200).json({ commentData, success: true });
    }catch(err){
        res.status(500).json(err);
    }    
});  

// Update comments
router.put('/:id', withAuth, async (req,res) =>{ 
    try {
        const commentData = await Comment.update(
        {
            comment : req.body.comment,
        },
        {
            where : {
                id: req.params.id, 
            },
        }
    );
    if (!commentData) { 
        res.status(404).json({ message: `The id ${req.params.id} has no comment.` });
        return;
        }
        res.status(200).json({ commentData, success: true });
    }catch (err) {
        res.status(500).json(err)
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
        res.status(200).json({ commentData, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 