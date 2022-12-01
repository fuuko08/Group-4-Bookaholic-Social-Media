const router = require('express').Router();
const { Like } = require('../../models');
const withAuth = require('../../utils/auth');
//Get all Likes


router.post("/", async (req, res) => {
    try {
        const likeData = await Like.create({
            id : req.body.id,
            userId : req.body.userId,
            like : req.body.like,
            postId : req.body.postId
        })
        res.status(200).json(likeData);
    }catch(err){
        res.status(400).json(err);
    }
    
});  

router.put('/', async (req,res) =>{
    try {
        const likeData = await Comment.create(
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
        res.status(200).json(likeData)
    }catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router; // export directly to router, you already called the route in index.js