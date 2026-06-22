
const { createPostService } = require('../services/posts/createpost.service')
const { getAllPostService } = require('../services/posts/getallpost.service')
const { getOnePostService } = require('../services/posts/getonepost.service')
const { deletePostService } = require('../services/posts/deletepost.service')
const { getPostByTagService } = require('../services/posts/getpostbytag.service')
const { getPostFeedService } = require('../services/posts/getfeedpost.service')



const createPostController = async (req, res, next) => {
    try {
        const data = await createPostService({
            ...req.body,
            ...req.user,
            postFile: req.file || null
        });
        return res.sendJsonResponse({ statusCode: 201, message: "Post Created successfully", data: data });
    } catch (error) {
        next(error)
    }
}

const getAllPostController = async (req, res, next) => {
    try {
        const data = await getAllPostService({ id: req.user.id, ...req.query });
        return res.sendJsonResponse({ statusCode: 200, message: "User All Post", data: data })
    } catch (error) {
        next(error)
    }
}

const getOnePostController = async (req, res, next) => {
    try {
        // console.log("user", req.user.id)
        const data = await getOnePostService({ ...req.params, userId: req.user.id })
        return res.sendJsonResponse({ statusCode: 200, message: "User Post", data: data })
    } catch (error) {
        next(error)
    }
}


const deletPostController = async (req, res, next) => {
    try {
        const data = await deletePostService(req.params);
        return res.sendJsonResponse({ statusCode: 200, message: "Post Data Deleted", data: {} })
    } catch (error) {
        next(error)
    }
}


const getPostByTagController = async (req, res, next) => {
    try {
        const data = await getPostByTagService(req.params.tag_id);
        return res.sendJsonResponse({ statusCode: 200, message: "Post By Tag", data: data })
    } catch (error) {
        next(error)
    }
}

const getPostFeedController = async (req, res, next) => {
    try {
        const data = await getPostFeedService(req.user.id, req.query);
        return res.sendJsonResponse({ statusCode: 200, message: "Post Feed", data: data })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createPostController,
    getAllPostController,
    getOnePostController,
    deletPostController,
    getPostByTagController,
    getPostFeedController
}
