const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

const adSchema = new Schema(
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
      type: Date,
      required: true,
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

adSchema.post('save', handleMongooseError);

const AdModel = model('Ads', adSchema);

module.exports = { AdModel };
