const { Router } = require('express');

const { getAllAgents, createAgent, updateAgentData } = require('../controllers');
const { authenticate, validateBody } = require('../middlewares');
const { agentSchema } = require('../schema');

const router = Router();

router.use(authenticate);

router.get('/', getAllAgents);
router.post('/', validateBody(agentSchema), createAgent);
router.put('/:agentId', validateBody(agentSchema), updateAgentData);

module.exports = router;
