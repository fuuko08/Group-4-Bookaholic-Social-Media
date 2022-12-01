const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth'); //we need to utilize this middleware

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll ({
            attributes: ['id', 'content', 'image', 'like', 'created_at'],
            order: [['created_at', 'DESC']],
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
        res.status(200).json(postData.reverse());
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get 1 post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findAll ({
            where: { id: req.params.id },
            attributes: ['id', 'like', 'content', 'image', 'created_at'],
            order: [['created_at', 'DESC']],
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
        if (!postData) {
            res.status(404).json({ message: `The id ${req.params.id} has no post.`});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Create post
router.post("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body, //replace 
            userId : req.session.userId, //syntax
        })
        res.status(200).json(postData);
    }catch(err){
        res.status(400).json(err);
    }    
}); 

// Edit post
router.put('/:id', withAuth, async (req,res) =>{
    try {
        const postData = await Post.update(
        {// only edit tile, content and image. userid and id stay the same
            title : req.body.title,
            content : req.body.content,
            image : req.body.image,
        }, 
        {
            where : {
                id: req.params.id, //syntax
            }
        });
        if (!postData) { //check if there is any post to edit
            res.status(404).json({ message: `The id ${req.params.id} has no post.` });
            return;
        }
        res.status(200).json(postData)
    }catch (err) {
        res.status(500).json(err);
    }
});

// delete post
router.delete("/:id", withAuth, async (req,res) => {
    try{
        const postData = await Post.destroy({ //syntax
            where: { id: req.params.id, uesrId: req.session.userId },
            });
        if (!postData) {
            res.status(404).json({ message: `User ${req.session.userId} has no post to delete`});
            return;
        }
            res.status(200).json(postData);
        } catch(err) {
            res.status(500).json(err) //syntax
        }
});

module.exports = router; // export directly to router, you already called the route in index.js