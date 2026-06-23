
const registerUserSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', pattern: '^(?!\\s*$).+',
        errorMessage:{
            pattern:'name must not be empty'          
         }},
         username: { type: 'string', minLength: 3 ,pattern: '^(?!\\s*$).+',
        errorMessage:{
            pattern:'username must not be empty'
        }
        },
        email: { type: 'string', format: 'email' },
        mobile_no: { type: 'string',minLength:10},
        bio: { type: 'string' },
        dob: { type: 'string', format: 'date' },
        is_account: { type: 'string', enum: ['public', 'private'] }
    },
    
    required: ['name', 'email', 'mobile_no', 'bio', 'dob'],
    additionalProperties: true
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

const updateUserSchema = {
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
        mobile_no: { type: 'string', minLength: 10 },
        bio: { type: 'string' },
        is_account: { type: 'string', enum: ['public', 'private'] }
    },
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
    registerUserSchema, loginUserSchema, updateUserSchema, verifyOtpSchema, verifyEmailSchema,userlogoutSchema
}
    
