const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

const commercialSchema = new Schema(
  {
    name: { type: String, required: true },
    show: {
      type: Schema.Types.ObjectId,
      ref: 'Shows',
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
      required: true,
    },
    agent: {
      type: Schema.Types.ObjectId,
      ref: 'Agents',
      required: true,
    },
    date: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

commercialSchema.post('save', handleMongooseError);

const CommercialModel = model('Commercials', commercialSchema);

module.exports = { CommercialModel };
