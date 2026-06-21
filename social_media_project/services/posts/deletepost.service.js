const { user, post } = require('../../models');
const { NotFoundError, AppError } = require('../../utils/error');

const deletePostService = async (reqData) => {
    const deleteData = await post.destroy({where:{id:reqData.id}})
    
    return deleteData;
};

module.exports = {
  deletePostService
};
