const express = require('express');
const router = express.Router();
const {loginUserController} = require('../controller/user.controller');
const {  loginUserSchema } = require('../validations/users/user_schema');
const { validateSchema } = require('../utils/validate_schema');
const { getAllUsersController, accountBandController } = require('../controller/admin.controller');
const { authenticateToken } = require('../middlewares/authmiddleware')

router.post('/login', validateSchema(loginUserSchema), loginUserController);
router.get('/getallusers', authenticateToken, getAllUsersController);
router.post('/accountband', authenticateToken, accountBandController);
module.exports = router;
