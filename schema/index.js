const { loginSchema } = require('./authSchema');
const { showSchema } = require('./showSchema');
const { customerSchema } = require('./customerSchema');
const { agentSchema } = require('./agentSchema');
const { adSchema } = require('./adSchema');

module.exports = { loginSchema, showSchema, customerSchema, agentSchema, adSchema };
