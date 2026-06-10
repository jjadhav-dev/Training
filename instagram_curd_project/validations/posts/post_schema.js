const createPostSchema = {
  type: 'object',
  properties: {
    description: { 
      type: 'string', 
      minLength: 1, 
      maxLength: 500,
      pattern: '^(?!\\s*$).+' 
    },
    image_url: { 
      type: 'string', 
    }
  },
  required: ['description', 'image_url'],
  additionalProperties: false
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
    description: {
      type: 'string',
      minLength: 1,
      maxLength: 500,
      pattern: '^(?!\\s*$).+'
    },
    image_url: { type: 'string' }
  },
  required: ['id'],
  additionalProperties: false
};

module.exports = {
    createPostSchema,
    getOnePostSchema,
    updatePostSchema
}