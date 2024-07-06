const { Router } = require('express');

const { login, currentUser } = require('../controllers');
const { authenticate } = require('../middlewares');

const router = Router();

router.post('/login', login);
router.get('/current', authenticate, currentUser);

module.exports = router;
