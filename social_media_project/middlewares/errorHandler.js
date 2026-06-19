// middlewares/errorHandler.js

const { AppError } = require('../utils/error')
const { UniqueConstraintError, ValidationError: SequelizeValidationError } = require('sequelize')

const globalErrorHandler = (err, req, res, next) => {

  if (err instanceof AppError) {
    return res.sendJsonResponse({ statusCode: err.statusCode, success: false, message: err.message, data: { } })
  }

//   if (err instanceof UniqueConstraintError) {
//     return res.sendJsonResponse({ statusCode: 409, success: false, message: 'Email already registered' })
//   }

  if (err instanceof SequelizeValidationError) {
    return res.sendJsonResponse({ statusCode: 400, success: false, message: err.errors.map((e) => e.message).join(', ') })
  }

console.log("err",err)
  return res.status(500).json({
    success: false,
    error: {
      message:err.message || "Please Try Again"
    },
  })
}

module.exports = { globalErrorHandler }