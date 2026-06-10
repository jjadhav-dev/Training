const { user, post } = require('../../models');
const { NotFoundError, AppError } = require('../../utils/error');

const updatePostService = async (reqData) => {
  const { id, description, image_url } = reqData;

  const existingPost = await post.findOne({
    where: { id }
  });

  if (!existingPost) {
    throw new NotFoundError('Post not found');
  }

  const [updatedCount] = 
    await post.update({description:reqData.description,image_url:reqData.image_url}, {
    where: { id:reqData.id }
  });

  if (updatedCount === 0) {
    throw new AppError('Post not updated', 400);
  }

  const updatedPost = await post.findOne({
    where: { id }
  });

  return updatedPost;
};

module.exports = {
  updatePostService
};
