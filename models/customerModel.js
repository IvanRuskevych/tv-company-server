const { Schema, model } = require('mongoose');

const { regex } = require('../constants');
const { handleMongooseError } = require('../utils');

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: {
        validator(val) {
          return regex.PHONE_NUMBER.test(val);
        },
        message: (props) => `${props.value} is not a valid phone number! It should start with "+" followed by digits.`,
      },
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    bankDetails: {
      bankName: {
        type: String,
        required: true,
      },
      customerCode: {
        type: String,
        validate: {
          validator(val) {
            return regex.CUSTOMER_CODE.test(val);
          },
          message: (props) => `${props.value} is not a valid customer code! It should contain only digits.`,
        },
        required: true,
      },
      iban: {
        type: String,
        validate: {
          validator(val) {
            return regex.IBAN.test(val);
          },
          message: (props) =>
            `${props.value} is not a valid IBAN! 
                         It should contain only any latin or number characters, and be between 15 and 34 characters long.`,
        },
        required: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

customerSchema.post('save', handleMongooseError);

const CustomerModel = model('Customers', customerSchema);

module.exports = { CustomerModel };
