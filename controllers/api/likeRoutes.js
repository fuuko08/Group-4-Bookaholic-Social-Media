const router = require('express').Router();
const { Like } = require('../../models');
const withAuth = require('../../utils/auth');

//Like or unLike a post
router.post('/:id', withAuth, async (req, res) => {
    try {
        const likeData = await Like.findOne({
            where: { userId: req.session.userId, postId: req.params}
        });

        if (!likeData) {
            await Like.create({ userId: req.session.userId, postId: req.params });
            res.status(200).json({ like: true, message: `You liked the post ${postId}` });
        } else {
            await Like.destroy({ where: likeData.dataValues });
            res.status(200).json({ like: false, message: `You unliked the post ${postId}` });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 