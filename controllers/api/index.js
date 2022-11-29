const router = require('express').Router();

const userRoutes = require('./userRoutes'); //typo
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;