const { where } = require('sequelize');
const { user, post,tag} = require('../../models');
const { ConflictError, NotFoundError, App, AppError } = require('../../utils/error');

const getAllPostService = async (reqData) => {
   // console.log(reqData);

    const page = parseInt(reqData.page) || 1;
    const limit = parseInt(reqData.per_page) || 10;
    const offset = (page - 1) * limit;

    const checkUsserExits = await user.findOne({
        where: { id: reqData.id }
    })

    if (!checkUsserExits) {
        throw new NotFoundError("User Not Found")
    }

    const userPostData = await post.findAndCountAll({
        where: { user_id: reqData.id },
        limit,
        offset,
        inculde:[{
            model:tag,
            as:''
        }],
        order: [['createdAt', 'DESC']]
    });

    return {
        user: checkUsserExits,
        posts:userPostData.rows,
        totalpost: userPostData.count,
        totalPages: Math.ceil(userPostData.count / limit),
        currentPage: page,
    };
}

module.exports = {
    getAllPostService
}