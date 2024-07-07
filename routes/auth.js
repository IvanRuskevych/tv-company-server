const { Router } = require('express');

const { login, currentUser } = require('../controllers');
const { authenticate, validateBody } = require('../middlewares');
const { loginSchema } = require('../schema');

const router = Router();

router.route('/').post(validateBody(loginSchema), login).get(authenticate, currentUser);

module.exports = router;
