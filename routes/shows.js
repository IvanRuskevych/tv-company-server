const { Router } = require('express');

const { showSchema } = require('../schema');
const { validateBody, authenticate } = require('../middlewares');
const { createShow, updateShowData, getAllShow, getShowByID, deleteShow } = require('../controllers');

const router = Router();

router.use(authenticate);

router.route('/').post(validateBody(showSchema), createShow).get(getAllShow);
router.route('/:showId').put(validateBody(showSchema), updateShowData).get(getShowByID).delete(deleteShow);

module.exports = router;
