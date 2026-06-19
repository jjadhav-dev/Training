const { follow, user } = require('../../models');

const getFollowerService = async (user_id) => {
    const userData = await user.findOne({
        where: { id: user_id },
        attributes: ['id', 'username'],
    });
    if (!userData) {
        throw new Error('User not found');
    }

    const result = await follow.findAll({
        where: {
            following_id: user_id,
        },
        include: {
            model: user,
            as: 'follower',
            attributes: ['id', 'username'],
        }
    });
    if (!result) {
        throw new Error('Follower not found');
    }

    return {
        userData,
        result,
        totalFollower: result.length,
    };
}
module.exports = { getFollowerService };
