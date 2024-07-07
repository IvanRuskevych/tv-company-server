const Joi = require('joi');

module.exports.showSchema = Joi.object()
    .keys({
        name: Joi.string().required().messages({
            'string.empty': "Field 'Show name' cannot be empty",
            'string.base': 'Show name must be a string',
            'any.required': 'Show name is required',
        }),
        rating: Joi.number().strict().max(100).required().messages({
            'number.empty': "Field 'Show rating' cannot be empty",
            'number.base': 'Rating must be a number',
            'number.max': 'Rating must be less than or equal to 100',
            'any.required': 'Show rating is required',
        }),
        pricePerCommercial: Joi.number().strict().min(0).required().messages({
            'number.empty': "Field 'Price per commercial' cannot be empty",
            'number.base': 'Price per commercial must be a number',
            'number.min': 'Price per commercial must be greater than or equal to 0',
            'any.required': 'Price per commercial is required',
        }),
    })
    .required()
    .messages({
        'any.required': 'Credentials object is required',
    });
