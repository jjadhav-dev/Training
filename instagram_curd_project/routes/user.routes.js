const express = require('express');
const router = express.Router();
const { validateSchema } = require('../utils/validate_schema');
const { registerUserSchema, loginUserSchema } = require('../validations/users/user_schema');
const { registerUserController, loginUserController } = require('../controller/user.controller');

router.post('/register', validateSchema(registerUserSchema), registerUserController);
router.post('/login', validateSchema(loginUserSchema), loginUserController)

module.exports = router;