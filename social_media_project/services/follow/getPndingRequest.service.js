const { follow, user } = require('../../models');

const getPndingRequestService = async (user_id) => {
    const userData = await user.findOne({
        where: {
            id: user_id
        },
        attributes: ['id', 'username'],
    })
    if (!userData) {
        throw new Error('User not found');
    }
    const pendingRequest = await follow.findAll({
        where: {
            following_id: user_id,
            status: 'pending',
        },
        attributes: ['id'],
        include: {
            model: user,
            as: 'follower',
            attributes: ['id', 'username'],
        }

        })
    return {
        userData,
        pendingRequest,
        pendingRequestCount: pendingRequest.length,
    };  
}
module.exports = { getPndingRequestService }