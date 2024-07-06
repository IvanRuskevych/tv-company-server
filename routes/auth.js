const { Router } = require('express');
const { login, current } = require('../controllers');

const router = Router();

// Login user

router.post('/login', login);
router.get('/current', current);

module.exports = router;
