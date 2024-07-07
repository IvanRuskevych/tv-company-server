const { Router } = require('express');

const { showSchema } = require('../schema');
const { createShow, getAllShow, updateShowData, deleteShow } = require('../controllers');
const { authenticate, validateBody } = require('../middlewares');

const router = Router();

router.use(authenticate);
router.route('/').get(getAllShow).post(validateBody(showSchema), createShow);
router.route('/:showId').put(validateBody(showSchema), updateShowData).delete(deleteShow);

module.exports = router;
