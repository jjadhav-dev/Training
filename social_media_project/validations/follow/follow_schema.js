const sendFollowSchema = {
  type: 'object',
  properties: {
    following_id: {
      type: 'integer',
      description: 'The following ID',
    },
  },
  required: ['following_id'],
}
const acceptFollowSchema = {
  type: 'object',
  properties: {
    following_id: {
      type: 'integer',
      description: 'The following ID',
    },
    status: {
      type: 'string',
      enum: ['accept', 'reject']
    },
  },
  required: ['following_id'],
}
module.exports = {sendFollowSchema,acceptFollowSchema}
