const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

module.exports.commercialSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'any.required': 'Commercial name is required.',
    'string.base': 'Commercial name must be a string.',
    'string.empty': "Field 'Commercial name' cannot be empty.",
  }),
  show: Joi.objectId().required().messages({
    'any.required': 'Show ID is required.',
    'string.base': 'Show ID must be a string.',
    'string.empty': "Field 'Show ID' cannot be empty.",
    objectId: 'Show ID must be a valid ObjectId.',
  }),
  customer: Joi.objectId().required().messages({
    'any.required': 'Customer ID is required.',
    'string.base': 'Customer ID must be a string.',
    'string.empty': "Field 'Customer ID' cannot be empty.",
  }),
  agent: Joi.objectId().required().messages({
    'any.required': 'Agent ID is required.',
    'string.base': 'Agent ID must be a string.',
    'string.empty': "Field 'Agent ID' cannot be empty.",
  }),
  date: Joi.object({
    start: Joi.date().required().messages({
      'date.base': 'Start date must be a valid date.',
      'any.required': 'Start date is required.',
    }),
    end: Joi.date().required().messages({
      'date.base': 'End date must be a valid date.',
      'any.required': 'End date is required.',
    }),
  }).required(),
  duration: Joi.number().required().messages({
    'any.required': 'Duration is required.',
    'number.base': 'Duration must be a number.',
    'number.empty': "Field 'Duration' cannot be empty.",
  }),
});
