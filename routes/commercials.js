const { Router } = require('express');

const { commercialSchema } = require('../schema');
const { validateBody, authenticate } = require('../middlewares');
const { createCommercial, getAllCommercials, updateCommercialData, deleteCommercial, getCommercialById } = require('../controllers');

const router = Router();

router.use(authenticate);

router.route('/').post(validateBody(commercialSchema), createCommercial).get(getAllCommercials);
router.route('/:commercialId').put(validateBody(commercialSchema), updateCommercialData).get(getCommercialById).delete(deleteCommercial);

module.exports = router;
