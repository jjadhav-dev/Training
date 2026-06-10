const registerUserSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 3 },
    },
    required: ['name', 'password', 'email'],
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
    