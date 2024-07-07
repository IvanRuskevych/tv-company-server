const { Router } = require('express');

const { agentSchema } = require('../schema');
const { authenticate, validateBody } = require('../middlewares');
const { getAllAgents, createAgent, updateAgentData, deleteAgent } = require('../controllers');

const router = Router();

router.use(authenticate);
router.route('/').get(getAllAgents).post(validateBody(agentSchema), createAgent);
router.route('/:agentId').put(validateBody(agentSchema), updateAgentData).delete(deleteAgent);

module.exports = router;
