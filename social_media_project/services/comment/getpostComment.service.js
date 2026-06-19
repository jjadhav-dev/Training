const { comment, user } = require('../../models');

// const getPostCommentService = async (reqData) => {
//     const commentData = await comment.findAll({
//         where: { post_id: reqData.post_id },
//         attributes: ['id', 'message'],
//         include: [
//             {
//              model: user, 
//              as: 'user',
//              attributes: ['id', 'username', 'name']
//             }
//         ],
//     })
//     return commentData;
// }
const getPostCommentService = async (reqData) => {
  const comments = await comment.findAll({
    where: { post_id: reqData.post_id, parent_comment_id: null },
    attributes: ['id', 'message', 'parent_comment_id'],
    include: [
      {
        model: user,
        as: 'user',
        attributes: ['id', 'username', 'name']
      },
      {
        model: comment,
        as: 'replies',
        attributes: ['id', 'message', 'parent_comment_id'],
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['id', 'username', 'name']
          }
        ]
      }
    ],
  });

  return comments;
};

module.exports = { getPostCommentService };