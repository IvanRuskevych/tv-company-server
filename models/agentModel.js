const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');

const agentSchema = new Schema(
    {
        name: { type: String, required: true },
        commission: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

agentSchema.post('save', handleMongooseError);

const AgentModel = model('Agents', agentSchema);

module.exports = { AgentModel };
