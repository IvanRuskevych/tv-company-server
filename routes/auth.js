const { Router } = require('express');

const { loginSchema } = require('../schema');
const { login } = require('../controllers');
const { validateBody } = require('../middlewares');

const router = Router();

router.route('/login').post(validateBody(loginSchema), login);

module.exports = router;
