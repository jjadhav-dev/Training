const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middlewares/authmiddleware')
const { sendFollowSchema } = require('../validations/follow/follow_schema')
const { validateSchema } = require('../utils/validate_schema')
const { sendFollowController, getFollowingController, getPndingRequestController } = require('../controller/follow.controller')


router.post('/sendfollowrequest', authenticateToken, validateSchema(sendFollowSchema), sendFollowController);
router.get('/getfollowing', authenticateToken, getFollowingController);
router.get('/getpendingrequest', authenticateToken, getPndingRequestController);
module.exports = router;
