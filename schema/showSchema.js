const Joi = require('joi');

module.exports.showSchema = Joi.object()
    .keys({
        name: Joi.string().required().messages({
            'any.required': 'Show name is required',
            'string.empty': "Field 'Show name' cannot be empty",
        }),
        rating: Joi.number().default(0).max(100).required().messages({
            'any.required': 'Show rating is required',
            'number.empty': "Field 'Show rating' cannot be empty",
            'number.max': 'Rating must be less than or equal to 100',
        }),
        pricePerCommercial: Joi.number().min(0).required().messages({
            'any.required': 'Price per commercial is required',
            'number.empty': "Field 'Price per commercial' cannot be empty",
            'number.min': 'Price per commercial must be greater than or equal to 0',
        }),
    })
    .required()
    .messages({
        'any.required': 'Credentials object is required',
    });
