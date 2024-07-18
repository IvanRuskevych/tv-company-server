const { Router } = require('express');

const { adSchema } = require('../schema');
const { validateBody } = require('../middlewares');
const { createAd, getAllAds, updateAdData, deleteAd, getAdById } = require('../controllers');

const router = Router();

// router.use(authenticate);

router.route('/').post(validateBody(adSchema), createAd).get(getAllAds);
router.route('/:advId').put(validateBody(adSchema), updateAdData).get(getAdById).delete(deleteAd);

module.exports = router;
