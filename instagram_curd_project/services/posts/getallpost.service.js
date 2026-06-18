const { user, post, tag ,posttag} = require('../../models');
const { ConflictError, NotFoundError, App, AppError } = require('../../utils/error');

const getAllPostService = async (reqData) => {
    const page = parseInt(reqData.page) || 1;
    const limit = parseInt(reqData.per_page) || 10;
    const offset = (page - 1) * limit;

    const checkUsserExits = await user.findOne({
        where: { id: reqData.id },
        attributes: ['id', 'is_active','profile_url','username']
    })

    if (!checkUsserExits) {
        throw new NotFoundError("User Not Found")
    }

    if(checkUsserExits.is_active !== true){
        throw new AppError("User Account is not active", 403)
    }

    const userPostData = await post.findAndCountAll({
        where: {
            user_id: reqData.id,
            status: 'published'
        },
        limit,
        offset,
        attributes: ['id', 'user_id', 'caption','url','createdAt'],
        include: [{
            model: posttag, as: 'posttags',
            attributes: ['id', 'post_id', 'tag_id'],
            include: [
                { model: tag, as: 'tag', attributes: ['id', 'name'] }
            ]
        }],
        order: [['createdAt', 'DESC']]
    });

    return {
        user: checkUsserExits,
        posts: userPostData.rows,
        totalpost: userPostData.count,
        totalPages: Math.ceil(userPostData.count / limit),
        currentPage: page,
    };
}

module.exports = {
    getAllPostService
}