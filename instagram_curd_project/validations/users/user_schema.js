const registerUserSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        username: { type: 'string', minLength: 3, pattern: '^[a-zA-Z0-9._-]+$' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 3 },
        mobile_no: { type: 'string' },
        bio: { type: 'string' },
        is_account: { type: 'string', enum: ['public', 'private'] }
    },
    required: ['name', 'username', 'password', 'email'],
    additionalProperties: false
};

const loginUserSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 3 },
    },
    required: ['password', 'email'],
    additionalProperties: false

}
module.exports = {
    registerUserSchema, loginUserSchema
}
    
