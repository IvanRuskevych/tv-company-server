const { loginSchema } = require('./authSchema');
const { showSchema } = require('./showSchema');
const { customerSchema } = require('./customerSchema');
const { agentSchema } = require('./agentSchema');
const { advSchema } = require('./advSchema');

module.exports = { loginSchema, showSchema, customerSchema, agentSchema, advSchema };
