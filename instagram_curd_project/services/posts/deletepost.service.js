const { user, post } = require('../../models');
const { NotFoundError, AppError } = require('../../utils/error');

const deletePostService = async (reqData) => {
    const deleteData = await post.destroy({where:{id:reqData.id}})
    // console.log("deletedata",deleteData)
    return deleteData;
};

module.exports = {
  deletePostService
};
