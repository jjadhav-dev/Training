const { user, post } = require('../../models');
const { ConflictError, NotFoundError, App, AppError } = require('../../utils/error');

const getOnePostService = async(id)=>{
    const getPost = await post.findOne({
        where:{
            id
        }
    })
    return getPost;
}

module.exports = {
    getOnePostService
}