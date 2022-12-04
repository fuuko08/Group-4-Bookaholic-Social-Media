const router = require('express').Router();
const { Like } = require('../../models');
const withAuth = require('../../utils/auth');

//Like or unLike a post
router.post('/:id', withAuth, async (req, res) => {
    try {
        console.log('add new like' + req.body.postId);
        const likeData = await Like.findOne({
            where: { userId: req.body.userId, postId: req.body.postId}
        });

        if (!likeData) {
            await Like.create({ userId: req.body.userId, postId: req.body.postId });
            res.status(200).json({ like: true, message: `You liked the post ${req.body.postId}` });
        } else {
            await Like.destroy({ where: likeData.dataValues });
            res.status(200).json({ like: false, message: `You unliked the post ${req.body.postId}` });
        }
    } catch (err) {
        console.log("ISSUE: " + err);
        res.status(500).json(err);
    }
});

module.exports = router; 