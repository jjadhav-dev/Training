const   createPostSchema = {
  type: 'object',
  properties: {
    caption: {
      type: 'string', 
      maxLength: 255,
      pattern: '^(?!\\s*$).+' 
    },
    post_type: {
      type: 'string', 
      enum: ['image', 'video']
    },
    name: {
      type: 'string'
    },
    scheduleTime: {
      type:'string'
    }
  },
  additionalProperties: true
};

const getOnePostSchema = {
  type: 'object',
  properties: {
    id: { type: 'string'}
  },
  required: ['id'],
  additionalProperties: false
};

const updatePostSchema = {
  type: 'object',
  properties: {
    id: { type: ['integer', 'string'] },
    caption: {
      type: 'string',
      maxLength: 255,
      pattern: '^(?!\\s*$).+'
    },
    post_type: {
      type: 'string',
      enum: ['image', 'video']
    },
    url: { type: 'string' }
  },
  required: ['id'],
  additionalProperties: false
};

module.exports = {
    createPostSchema,
    getOnePostSchema,
    updatePostSchema
}
