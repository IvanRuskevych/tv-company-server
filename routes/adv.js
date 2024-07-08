const { Router } = require('express');

const { advSchema } = require('../schema');
const { authenticate, validateBody } = require('../middlewares');
const { createAdv, getAllAdv, updateAdv, deleteAdv, getAdvById } = require('../controllers');

const router = Router();

router.use(authenticate);

router.route('/').post(validateBody(advSchema), createAdv).get(getAllAdv);

router.route('/:advId').put(validateBody(advSchema), updateAdv).get(getAdvById).delete(deleteAdv);

module.exports = router;
