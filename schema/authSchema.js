const Joi = require('joi');

module.exports.loginSchema = Joi.object()
    .optional({ abortEarly: false })
    .keys({
        employeeID: Joi.string().required().messages({
            'any.required': 'Employee ID is required',
            'string.empty': "Field 'Employee ID' cannot be empty",
        }),
        password: Joi.string().required().messages({
            'any.required': 'Password is required',
            'string.empty': "Field 'Password' cannot be empty",
        }),
    });
