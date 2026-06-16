const bcrypt = require('bcrypt');
const { registerUserService,loginService }= require('../services/user/user.authservice');

const registerUserController = async (req, res, next) => {
    try {
        console.log(req.body);
        
        const newUser = await registerUserService(req.body);
        console.log("new user",newUser);
        
        res.sendJsonResponse({ statusCode: 201, message: "User registered successfully", data: newUser });
    } catch (error) {
        next(error);
    }
}

const loginUserController = async (req, res, next) => {
    try {
        const data = await loginService(req.body);
        return res.sendJsonResponse({ statusCode: 200, message: "User Login Successfully", data:data})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerUserController, loginUserController
}