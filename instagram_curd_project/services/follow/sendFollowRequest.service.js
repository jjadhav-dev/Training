const { follow,user } = require('../../models');

const sendFollowRequestService = async (reqData) => {
    const followUserData = await user.findOne({
        where: {
            id: reqData.following_id
        }
    })

    if (!followUserData) {
        throw new Error('User not found');
    }

    if (followUserData.id === reqData.user_id) {
        throw new Error('You cannot follow yourself');
    }

    if (followUserData.is_account === "private") {
        await follow.create({
            follower_id: reqData.user_id,
            following_id: reqData.following_id,
            status: 'pending',
        })
        return `Follow request sent successfully TO ${followUserData.username}`;
    } else {
        await follow.create({
            follower_id: reqData.user_id,
            following_id: reqData.following_id,
        })
        return `Follow request sent successfully TO ${followUserData.username}`;
    }
};

module.exports = { sendFollowRequestService }
