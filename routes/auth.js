const { Router } = require('express');

const { login, currentUser } = require('../controllers');
const { authenticate, validateBody } = require('../middlewares');
const { loginSchema } = require('../schema');

const router = Router();

router.post('/login', validateBody(loginSchema), login);
router.get('/current', authenticate, currentUser);

module.exports = router;
