const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middlewares/authmiddleware')
const { sendFollowSchema,acceptFollowSchema } = require('../validations/follow/follow_schema')
const { validateSchema } = require('../utils/validate_schema')
const { sendFollowController, getFollowingController, getPndingRequestController, acceptRequestController, getFollowerController } = require('../controller/follow.controller')


router.post('/sendfollowrequest', authenticateToken, validateSchema(sendFollowSchema), sendFollowController);
router.get('/getfollowing', authenticateToken, getFollowingController);
router.get('/getfollower', authenticateToken, getFollowerController);
router.get('/getpendingrequest', authenticateToken, getPndingRequestController);
router.post('/acceptrequest', authenticateToken, validateSchema(acceptFollowSchema), acceptRequestController);
module.exports = router;
