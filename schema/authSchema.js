const Joi = require('joi');

module.exports.loginSchema = Joi.object()
  .keys({
    employeeID: Joi.string().required().messages({
      'any.required': 'Employee ID is required.',
      'string.empty': "Field 'Employee ID' cannot be empty.",
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required.',
      'string.empty': "Field 'Password' cannot be empty.",
    }),
  })
  .required()
  .messages({
    'any.required': 'Credentials object is required.',
  });

module.exports.refreshTokenSchema = Joi.object().keys({
  refreshToken: Joi.string().required().messages({
    'any.required': 'Refresh token is required.',
  }),
});
