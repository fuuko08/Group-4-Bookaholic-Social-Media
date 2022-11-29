const router = require('express').Router();
const  Like = require('../../models/Comment');

router.post("/", async (req, res) => {
    try {
        const likeData = await Like.create({
            id : req.body.id,
            userId : req.body.userId,
            like : req.body.like,
            postId : req.body.postId
        })
        res.status(200).json(commentData);
    }catch(err){
        res.status(400).json(err);
    }
    
});  

module.exports = commentPost;