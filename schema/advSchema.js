const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

module.exports.advSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'any.required': 'Advertisement name is required.',
    'string.base': 'Advertisement name must be a string.',
    'string.empty': "Field 'Advertisement name' cannot be empty.",
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
    // '/objectId/': 'Customer ID must be a valid ObjectId.',
  }),
  agent: Joi.objectId().required().messages({
    'any.required': 'Agent ID is required.',
    'string.base': 'Agent ID must be a string.',
    'string.empty': "Field 'Agent ID' cannot be empty.",
    // '/objectId/': 'Agent ID must be a valid ObjectId.',
  }),
  date: Joi.date().format('YYYY-MM-DD').utc().messages({
    'date.format': 'Date must be in the format YYYY-MM-DD.',
    'date.base': 'Date must be a valid date.',
  }),
  duration: Joi.number().required().messages({
    'any.required': 'Duration is required.',
    'number.base': 'Duration must be a number.',
    'number.empty': "Field 'Duration' cannot be empty.",
  }),
});
