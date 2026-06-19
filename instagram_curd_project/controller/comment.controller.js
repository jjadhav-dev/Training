const { createCommentService } = require('../services/comment/createComment.service');
const { getPostCommentService } = require('../services/comment/getpostComment.service');
const { replyCommentService } = require('../services/comment/replyComment.service');
const { deleteCommentService } = require('../services/comment/deleteComment.service');

const createCommentController = async (req, res) => {
    const comment = await createCommentService({...req.body, user_id: req.user.id});
    return res.sendJsonResponse({ statusCode: 201, message: "Comment Created successfully", data: comment });
}

const getPostCommentController = async (req, res) => {
    const comment = await getPostCommentService(req.params);
    return res.sendJsonResponse({ statusCode: 200, message: "Post Comment", data: comment });
}

const replyCommentController = async (req, res) => {
    const comment = await replyCommentService({...req.body, user_id: req.user.id});
    return res.sendJsonResponse({ statusCode: 201, message: "Comment Replied successfully", data: comment });
}

const deleteCommentController = async (req, res) => {
    const comment = await deleteCommentService({...req.params, user_id: req.user.id});
    return res.sendJsonResponse({ statusCode: 200, message: "Comment Deleted successfully", data: comment });
}



module.exports = {createCommentController, getPostCommentController, replyCommentController, deleteCommentController};   
