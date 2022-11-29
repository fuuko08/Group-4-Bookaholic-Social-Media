const router = require('express').Router();
const  Comment = require('../../models/Comment');

router.post("/", async (req, res) => {
    try {
        const commentData = await Comment.create({
            id : req.body.id,
            userId : req.body.userId,
            comment : req.body.comment,
            postId : req.body.postId
        })
        res.status(200).json(commentData);
    }catch(err){
        res.status(400).json(err);
    }
    
});  

router.put('/', async (req,res) =>{
    try {
        const commentData = await Comment.create(
        {
            id : req.body.id,
            userId : req.body.userId,
            comment : req.body.comment,
            postId : req.body.postId
        },
        {
            where : {
                id: req.body.id,
            }
        });
        res.status(200).json(commentData)
    }catch (err) {
        res.status(400).json(err)
    }

})

module.exports = commentPost;