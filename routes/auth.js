const { Router } = require('express');

const { loginSchema, refreshTokenSchema } = require('../schema');
const { login, refresh, logout } = require('../controllers');
const { validateBody, authenticate } = require('../middlewares');

const router = Router();

router.route('/login').post(validateBody(loginSchema), login);
router.route('/refresh').post(validateBody(refreshTokenSchema), refresh);
router.route('/logout').post(authenticate, logout);

module.exports = router;
