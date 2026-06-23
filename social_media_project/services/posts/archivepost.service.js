const {post} = require('../../models')
const {NotFoundError} = require('../../utils/error')
const archivePostService = async (body) => {
    const postExits = await post.findOne({where: {id: body.id}})
    if (!postExits) {
        throw new NotFoundError("Post not found")
    }
    await post.update(
        {is_archived: body.is_archived},
        {where: {id: body.id}}
    )
   const data = await post.findOne({where: {id: body.id}})
   return data
}

module.exports = {
    archivePostService
}