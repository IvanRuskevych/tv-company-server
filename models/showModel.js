const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');

const showSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      required: true,
      max: 100,
    },
    pricePerCommercial: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

showSchema.post('save', handleMongooseError);

const ShowModel = model('Shows', showSchema);

module.exports = { ShowModel };
