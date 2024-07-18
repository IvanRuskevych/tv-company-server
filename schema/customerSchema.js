const Joi = require('joi');

const { regex } = require('../constants');

module.exports.customerSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'any.required': 'Customer name is required.',
    'string.base': 'Customer name must be a string.',
    'string.empty': "Field 'Customer name' cannot be empty.",
  }),
  phone: Joi.string().pattern(regex.PHONE_NUMBER).required().messages({
    'any.required': 'Contact phone is required.',
    'string.base': 'Contact phone must be a string.',
    'string.empty': "Field 'Contact phone' cannot be empty.",
    'string.pattern.base': 'Contact phone should start with + followed by digits.',
  }),
  contactPerson: Joi.string().required().messages({
    'any.required': 'Contact person is required.',
    'string.base': 'Contact person must be a string.',
    'string.empty': "Field 'Contact person' cannot be empty.",
  }),
  bankDetails: {
    bankName: Joi.string().required().messages({
      'any.required': 'Bank name is required.',
      'string.base': 'Bank name must be a string.',
      'string.empty': "Field 'Bank name' cannot be empty.",
    }),
    identifierTIN: Joi.string().pattern(regex.TIN).required().messages({
      'any.required': 'Customer code is required.',
      'string.base': 'Customer code must be a string.',
      'string.empty': "Field 'Customer code' cannot be empty.",
      'string.pattern.base': 'Customer code should contain only digits.',
    }),
    iban: Joi.string().pattern(regex.IBAN).required().messages({
      'any.required': 'IBAN is required.',
      'string.base': 'IBAN must be a string.',
      'string.empty': "Field 'IBAN' cannot be empty.",
      'string.pattern.base': 'IBAN should contain only any latin or number characters, and be between 15 and 34 characters long.',
    }),
  },
});
