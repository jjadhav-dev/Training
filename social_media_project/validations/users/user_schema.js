
const registerUserSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', pattern: '^(?!\\s*$).+',
        errorMessage:{
            pattern:'name must not be empty'
         }},
        username: { type: 'string', minLength: 3 ,pattern: '^(?!\\s*$).+',
        errorMessage:{
            pattern:'name must not be empty'
        }
        },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 3 },
        mobile_no: { type: 'string',minLength:10},
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

};

const verifyOtpSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        otp: { type: 'string', pattern: '^[0-9]{6}$' }
    },
    required: ['email', 'otp'],
    additionalProperties: false
};

const verifyEmailSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
    },
    required: ['email'],
    additionalProperties: false
};  

const userlogoutSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
    },
    required: ['email'],
    additionalProperties: false
};

module.exports = {
    registerUserSchema, loginUserSchema, verifyOtpSchema, verifyEmailSchema,userlogoutSchema
}
    
