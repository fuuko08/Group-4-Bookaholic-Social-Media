const router = require('express').Router();

const userRoutes = require('./user-routes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');
const postRoutes = require('./postRoutes');

router.use('/comments', commentRoutes);
router.use('/likes', likeRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
