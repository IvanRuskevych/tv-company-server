const { Router } = require('express');
const { authenticate, validateBody } = require('../middlewares');
const { createAdv, getAllAdv, updateAdv, deleteAdv, getAdvById } = require('../controllers');

const router = Router();

router.use(authenticate);

router.route('/').post(createAdv).get(getAllAdv);

router.route('/advId').put(updateAdv).get(getAdvById).delete(deleteAdv);

module.exports = router;
