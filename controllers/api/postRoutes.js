const router = require('express').Router();
const  Post = require('../../models/post');

router.post("/", async (req, res) => {
    try {
        const postData = await Post.create({
            id : req.body.id,
            title : req.body.title,
            content : req.body.content,
            Image : req.body.Image,
            userId : req.body.userId
        })
        res.status(200).json(postData);
    }catch(err){
        res.status(400).json(err);
    }
    
});  

module.exports = commentPost;