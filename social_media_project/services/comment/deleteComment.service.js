const { comment, post } = require('../../models');

const deleteCommentService = async (reqData) => {
    console.log("reqData",reqData.id)
    const result = await comment.findOne({
        where: { id: reqData.id, is_deleted: false },
    });
    
    console.log("result:", result);
    if (!result) {
        throw new Error('Comment not found');
    }
    const postData = await post.findOne({
        where: { id: result.post_id },
    })
    
    if(postData.user_id !== reqData.user_id) {
        throw new Error('You are not the owner of the post');
    }
   const deleteResult = await comment.update({
        is_deleted: true,
    }, {
        where: { id: reqData.id },
    });

    if(deleteResult[0] === 0) {
        throw new Error('Failed to delete comment');
    }
    return null;
}
module.exports = {deleteCommentService};
