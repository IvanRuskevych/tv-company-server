const { Router } = require('express');

const { agentSchema } = require('../schema');
const { validateBody, authenticate } = require('../middlewares');
const { getAllAgents, createAgent, updateAgentData, deleteAgent, getAgentById } = require('../controllers');

const router = Router();

router.use(authenticate);

router.route('/').post(validateBody(agentSchema), createAgent).get(getAllAgents);
router.route('/:agentId').put(validateBody(agentSchema), updateAgentData).get(getAgentById).delete(deleteAgent);

module.exports = router;
