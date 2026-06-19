const { comment } = require('../../models');

const createCommentService = async (data) => {
    const newComment = await comment.create(data);
    return newComment;
}

module.exports = {createCommentService};
