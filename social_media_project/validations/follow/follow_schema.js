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
module.exports = {sendFollowSchema}
