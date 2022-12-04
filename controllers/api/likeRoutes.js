const router = require('express').Router();
const { Like, User } = require('../../models');
const withAuth = require('../../utils/auth');

//Like or unLike a post
router.post('/:id',withAuth, async (req, res) => {
    try {        

        const userId = req.session.userId;
        console.log("POST ID: " + req.params.id);
        const likeData = await Like.findOne({
            where: { userId: userId , postId: req.params.id}
        });

        if (!likeData) {
            const resultData = await Like.create({ userId: userId, postId: req.params.id });
            res.status(200).json({ like: true, message: `You liked the post ${req.params.id}` });            
        } else {
            const resultData = await Like.destroy({ where: likeData.dataValues });
            res.status(200).json({ like: false, message: `You unliked the post ${req.params.id}` });            
        }
        
    } catch (err) {
        console.log("ISSUE: " + err);
        res.status(500).json(err);
    }
});

module.exports = router; 