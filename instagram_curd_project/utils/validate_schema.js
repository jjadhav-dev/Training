// validations/validateSchema.js

const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const { validationError } = require('../utils/error')

const ajv = new Ajv({
    allErrors: true,
    removeAdditional: true
})

addFormats(ajv)


const validateSchema = (schema, source = 'body') => {
    const validate = ajv.compile(schema);

    return (req, res, next) => {
        const data = req[source];
        const valid = validate(data);

        if (!valid) {
            const errors = validate.errors.map(err => {
                const field = err.instancePath.replace('/', '') || err.params.missingProperty;
                return {
                    field,
                    message: `${field} ${err.message}`
                };
            });
            return next(new validationError(errors[0].message, 'VALIDATION_ERROR'));
        }
        next();
    };
};


module.exports = { validateSchema };