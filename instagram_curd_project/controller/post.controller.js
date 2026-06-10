
const { createPostService } = require('../services/posts/createpost.service')
const { getAllPostService } = require('../services/posts/getallpost.service')
const { getOnePostService } = require('../services/posts/getonepost.service')
const { updatePostService } = require('../services/posts/updatepost.service')
const { deletePostService } = require('../services/posts/deletepost.service')

const createPostController = async (req, res, next) => {
    try {
        const data = await createPostService({ ...req.body, ...req.user });
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
        const data = await getOnePostService(req.params.id)
        return res.sendJsonResponse({ statusCode: 200, message: "User Post", data: data })

    } catch (error) {
        next(error)
    }
}

const updatePostController = async (req, res, next) => {
    try {
        const data = await updatePostService({ ...req.body });
        return res.sendJsonResponse({ statusCode: 200, message: "User Post Updated", data: data })
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

module.exports = {
    createPostController,
    getAllPostController,
    getOnePostController,
    updatePostController,
    deletPostController
}