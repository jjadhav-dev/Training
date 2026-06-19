const { comment } = require('../../models');

const replyCommentService = async (reqData) => {
    const commentData = await comment.create({
        message: reqData.message,
        post_id: reqData.post_id,
        user_id: reqData.user_id,
        parent_comment_id: reqData.parent_comment_id,
    })
    return commentData;
}

module.exports = { replyCommentService };