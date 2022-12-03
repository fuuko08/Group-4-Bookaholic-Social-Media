const router = require('express').Router();

const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const likeRoutes = require('./likeRoutes');

router.use('/comment', commentRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);
router.use('/like', likeRoutes);

module.exports = router;