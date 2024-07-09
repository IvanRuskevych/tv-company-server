const { Router } = require('express');

const { currentUser } = require('../controllers');
const { authenticate } = require('../middlewares');

const router = Router();

router.route('/current').get(authenticate, currentUser);

module.exports = router;
