const { Router } = require('express');

const { showSchema } = require('../schema');
const { createShow, getAllShow } = require('../controllers');
const { authenticate, validateBody } = require('../middlewares');

const router = Router();

router.post('/create', authenticate, validateBody(showSchema), createShow);
router.get('/', authenticate, getAllShow);

module.exports = router;
