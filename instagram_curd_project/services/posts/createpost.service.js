const { user, post } = require('../../models');

const createPostService = async (reqData) => {
    const { id: user_id, ...data } = reqData;

    const result = await post.create({
        ...data,
        user_id,
    });

    return result;
};

module.exports = {
    createPostService,
};
