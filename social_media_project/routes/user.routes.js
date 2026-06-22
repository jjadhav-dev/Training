const express = require('express');
const router = express.Router();
const { validateSchema } = require('../utils/validate_schema');
const { registerUserSchema, loginUserSchema, verifyOtpSchema, verifyEmailSchema,userlogoutSchema } = require('../validations/users/user_schema');
const { registerUserController, loginUserController, verifyOtpController, resendOtpController, changePasswordController, logoutController } = require('../controller/user.controller');
const { handleProfileUpload } = require('../middlewares/upload.middleware');
const { authenticateToken } = require('../middlewares/authmiddleware')

router.post('/register', handleProfileUpload, validateSchema(registerUserSchema), registerUserController);
router.post('/login', validateSchema(loginUserSchema), loginUserController);
router.post('/verify-otp', validateSchema(verifyOtpSchema), verifyOtpController);
router.post('/resend-otp', validateSchema(verifyEmailSchema), resendOtpController);
router.post('/forget-password', validateSchema(verifyEmailSchema), resendOtpController);
router.post('/change-password', validateSchema(verifyOtpSchema), changePasswordController);
router.post('/logout', authenticateToken, validateSchema(userlogoutSchema), logoutController);

module.exports = router;
