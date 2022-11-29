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

router.put('/', async (req,res) =>{
    try {
        const postData = await Comment.create(
        {
            id : req.body.id,
            title : req.body.title,
            content : req.body.content,
            Image : req.body.Image,
            userId : req.body.userId
        },
        {
            where : {
                id: req.body.id,
            }
        });
        res.status(200).json(postData)
    }catch (err) {
        res.status(400).json(err)
    }
})

router.delete("/:id", async (req,res) => {
    try{
        const postData = await Comment.delete(
            {
                id : req.body.id,
                title : req.body.title,
                content : req.body.content,
                Image : req.body.Image,
                userId : req.body.userId
            })
            res.status(200).json(postData)

         }
        catch(err){
            res.status(400).json(err)
        }
})

module.exports = commentPost;