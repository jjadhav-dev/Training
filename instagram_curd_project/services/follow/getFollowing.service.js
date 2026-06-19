const { follow,user } = require('../../models');

const getFollowingService = async (user_id) => {    
    const userData = await user.findOne({
        where: {
            id: user_id,
        },
        attributes: ['id', 'username'],
    })
  
    const followingData = await follow.findAll({
        where: {
            follower_id: user_id,
            status: 'accepted',
        },
        attributes: [],
        raw: true,
        include: {
            model: user,
            as: 'following',
            attributes: ['id', 'username']
        }
    })
    return {
        userData,
        followingData,
        followingCount: followingData.length,
    };
}
module.exports = { getFollowingService }
