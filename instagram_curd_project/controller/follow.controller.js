const { sendFollowRequestService } = require('../services/follow/sendFollowRequest.service');
const { getFollowingService } = require('../services/follow/getFollowing.service');
const { getPndingRequestService } = require('../services/follow/getPndingRequest.service');

const sendFollowController = async (req, res, next) => {
    try {
         const followData = await sendFollowRequestService({...req.body, user_id: req.user.id});
        res.sendJsonResponse({ message: 'Follow request sent successfully', followData });
    } catch (error) {
        next(error);
    }
}

const getFollowingController = async (req, res, next) => {
    try {
        const followingData = await getFollowingService(req.user.id);        
        res.sendJsonResponse({ message: 'Following data retrieved successfully', data:followingData });
    } catch (error) {
        next(error);
    }
}

const getPndingRequestController = async (req, res, next) => {
    try {
        const pendingRequestData = await getPndingRequestService(req.user.id);
        res.sendJsonResponse({ message: 'Pending request data retrieved successfully', data:pendingRequestData });
    } catch (error) {
        next(error);
    }
}
module.exports = { sendFollowController, getFollowingController, getPndingRequestController } 
