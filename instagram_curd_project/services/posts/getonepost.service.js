const { post, tag ,posttag} = require('../../models');
const getOnePostService = async(reqData)=>{
    const getPost = await post.findOne({
        where:{
            id: reqData.id,
            user_id: reqData.userId
        },
        include: [{
            model: posttag,
            as: 'posttags',
            attributes: ['id', 'post_id', 'tag_id'],
            include: [
                { 
                    model: tag,
                     as: 'tag', 
                     attributes: ['id', 'name'] 
                }
            ]
        }]
    })
    return getPost;
}

module.exports = {
    getOnePostService
}