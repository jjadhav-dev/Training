const createCommentSchema = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
            maxLength: 255,
        },
        post_id: {
            type: 'integer'
        }
    },
    required: ['message', 'post_id'],
    additionalProperties: false
    }      

const replyCommentSchema = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
            maxLength: 255,
        },
        post_id: {
            type: 'integer'
        },
        parent_comment_id: {
            type: 'integer'
        }
    },
    required: ['message', 'post_id', 'parent_comment_id'],
    additionalProperties: false
    }
        
module.exports = {createCommentSchema, replyCommentSchema};
