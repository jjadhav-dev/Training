const express = require('express');
const router = express.Router();
const { validateSchema } = require('../utils/validate_schema');
const { authenticateToken } = require('../middlewares/authmiddleware')
const { createPostController, getAllPostController, getOnePostController, updatePostController, deletPostController } = require('../controller/post.controller')
const { createPostSchema, getOnePostSchema, updatePostSchema } = require('../validations/posts/post_schema')

router.post('/createpost', authenticateToken, validateSchema(createPostSchema), createPostController)
router.get('/getallpost', authenticateToken, getAllPostController)
router.get('/getonepost/:id', authenticateToken, validateSchema(getOnePostSchema,'params'), getOnePostController)
router.post('/updatepost', authenticateToken, validateSchema(updatePostSchema), updatePostController)
router.delete('/deletepost/:id',authenticateToken, validateSchema(getOnePostSchema,'params'),deletPostController)
module.exports = router;