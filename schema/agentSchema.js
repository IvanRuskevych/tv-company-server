const Joi = require('joi');

module.exports.agentSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'any.required': 'Agent name is required.',
    'string.base': 'Agent name must be a string.',
    'string.empty': "Field 'Agent name' cannot be empty.",
  }),
  commission: Joi.number().strict().min(0).max(100).required().messages({
    'any.required': 'Commission is required.',
    'number.base': 'Commission must be a number.',
    'number.empty': "Field 'Commission' cannot be empty.",
    'number.min': 'Commission must be at least 0.',
    'number.max': 'Commission must be less than or equal to 100.',
  }),
});
