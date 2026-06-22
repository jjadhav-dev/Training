const { user, post, follow } = require("../../models");
const { Op } = require("sequelize");

const getPostFeedService = async (userId, query) => {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const userExists = await user.findByPk(userId);
    if (!userExists) {
        throw new Error("User not found");
    }

    const followingUsers = await follow.findAll({
        where: {
            follower_id: userId,
            status: "accepted"
        },
        attributes: ["following_id"]
    });

    const followingIds = followingUsers.map(
        (item) => item.following_id
    );

    const feedPosts = await post.findAll({
        where: {
            user_id: {
                [Op.in]: followingIds
            }
        },
        include: [
            {
                model: user,
                as: "user",
                attributes: ["id", "username"]
            }
        ],
        order: [["id", "DESC"]],
        offset,
        limit
    });

    return feedPosts;
};

module.exports = { getPostFeedService };
