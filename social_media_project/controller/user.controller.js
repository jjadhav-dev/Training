const { registerUserService, loginService, verifyOtpService, resendOtpService, changePasswordService, logoutService }= require('../services/user/user.authservice');



const registerUserController = async (req, res, next) => {
    try {
        console.log("file",req.file);
        
        const newUser = await registerUserService({
            ...req.body,
            profileFile: req.file
        });
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

const verifyOtpController = async (req, res, next) => {
    try {
        const data = await verifyOtpService(req.body);
        return res.sendJsonResponse({ statusCode: 200, message: "OTP verified successfully", data });
    } catch (error) {
        next(error);
    }
}

const resendOtpController = async (req, res, next) => {
    try {
        const data = await resendOtpService(req.body);
        return res.sendJsonResponse({ statusCode: 200, message: "OTP resent successfully", data });
    } catch (error) {
        next(error);
    }
}

const changePasswordController = async (req, res, next) => {
    try {
        const data = await changePasswordService(req.body);
        return res.sendJsonResponse({ statusCode: 200, message: "Password changed successfully", data });
    } catch (error) {
        next(error);
    }
}

const logoutController = async (req, res, next) => {
    try {
        const data = await logoutService(req.body);
        return res.sendJsonResponse({ statusCode: 200, message: "User Logout Successfully", data:data})
    } catch (error) {
        next(error)
    }
}

const updateUserController = async (req, res, next) => {
    try {
        const data = await updateUserService({
            ...req.body,
            id: req.user.id,    
            profileFile: req.file
        });
        return res.sendJsonResponse({ statusCode: 200, message: "User updated successfully", data });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    registerUserController,
    updateUserController,
    loginUserController,
     verifyOtpController, 
     resendOtpController,
     changePasswordController,
     logoutController,
      updateUserController
}
