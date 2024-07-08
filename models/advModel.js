const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

const advSchema = new Schema(
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

advSchema.post('save', handleMongooseError);

const AdvModel = model('Advs', advSchema);

module.exports = { AdvModel };
