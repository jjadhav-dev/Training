const express = require('express');
const router = express.Router();
const { createCommentSchema, replyCommentSchema } = require('../validations/comment/comment_schema');
const { createCommentController, getPostCommentController, replyCommentController, deleteCommentController } = require('../controller/comment.controller');
const { authenticateToken } = require('../middlewares/authmiddleware')
const { validateSchema } = require('../utils/validate_schema');

router.post('/createcomment', authenticateToken, validateSchema(createCommentSchema), createCommentController);  
router.get('/getpostcomment/:post_id', authenticateToken, getPostCommentController); 
router.post('/replycomment', authenticateToken, validateSchema(replyCommentSchema), replyCommentController); 
router.delete('/deletecomment/:id', authenticateToken, deleteCommentController);

module.exports = router;
