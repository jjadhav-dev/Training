const { getAllUsersService } = require('../services/admin/getallUser.service');
const { accountBandService } = require('../services/admin/accountBand.service');
const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsersService(req.user, req.query);
    return res.sendJsonResponse({ statusCode: 201, message: "All Users", data: users });
  } catch (error) {
    next(error)
  }
};

const accountBandController = async (req, res, next) => {
  try {
    const data = await accountBandService(req.user, req.body);
    return res.sendJsonResponse({ statusCode: 200, message: "Account Band Updated", data: data });
  } catch (error) {
    next(error)
  }
};

module.exports = {
    getAllUsersController,
    accountBandController,
}