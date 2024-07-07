const { Schema, model } = require('mongoose');

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

const ShowModel = model('Shows', showSchema);

module.exports = { ShowModel };
