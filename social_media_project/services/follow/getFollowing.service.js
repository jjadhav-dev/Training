const { follow,user } = require('../../models');

const getFollowingService = async (user_id,query) => {    
    const { page = 1, pageSize = 10 } = query;
    const offset = (page - 1) * pageSize;

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
        offset,
        limit: pageSize,
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
