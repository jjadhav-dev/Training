const express = require('express');
const router = express.Router();
const { validateSchema } = require('../utils/validate_schema');
const { registerUserSchema, loginUserSchema } = require('../validations/users/user_schema');
const { registerUserController, loginUserController } = require('../controller/user.controller');
const { handleProfileUpload } = require('../middlewares/upload.middleware');

router.post('/register', handleProfileUpload, validateSchema(registerUserSchema), registerUserController);
router.post('/login', validateSchema(loginUserSchema), loginUserController)

module.exports = router;
