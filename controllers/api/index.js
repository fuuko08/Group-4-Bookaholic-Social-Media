const router = require('express').Router();

const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const likeRoutes = require('./likeRoutes');

router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/like', likeRoutes);

module.exports = router;