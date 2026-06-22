const express = require('express');
const router = express.Router();

router.use('/users',require('./user.routes'))
router.use('/posts',require('./post.routes'))
router.use('/comments',require('./comment.routes'))
router.use('/follows',require('./follow.routes'))
router.use('/admin',require('./admin.routes'))

module.exports = router;