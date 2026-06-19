const express = require('express');
const router = express.Router();
const { validateSchema } = require('../utils/validate_schema');
const { authenticateToken } = require('../middlewares/authmiddleware')
const { handlePostUpload } = require('../middlewares/upload.middleware');
const { createPostController, getAllPostController, getOnePostController, deletPostController ,getPostByTagController} = require('../controller/post.controller')
const { createPostSchema, getOnePostSchema } = require('../validations/posts/post_schema')

router.post('/createpost', authenticateToken, handlePostUpload, validateSchema(createPostSchema), createPostController)
router.get('/getallpost', authenticateToken, getAllPostController)
router.get('/getonepost/:id', authenticateToken, validateSchema(getOnePostSchema,'params'), getOnePostController)
router.delete('/deletepost/:id',authenticateToken, validateSchema(getOnePostSchema,'params'),deletPostController)
router.get('/postbytag/:tag_id', authenticateToken, getPostByTagController)
module.exports = router;
