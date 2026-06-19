
const apiresponse = (req, res, next) => {
  res.sendJsonResponse = ({ message = '', data = {}, statusCode = 200, success = true }) => {
    return res.status(statusCode).json({
      success,
      message,
      data,
    })
  }
  next();
}

module.exports = { apiresponse }