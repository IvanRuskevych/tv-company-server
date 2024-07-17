const { AdModel, ShowModel } = require('../models');
const { getExistsDoc, updateDocByID, getDocByID } = require('../services');
const { ctrlWrapper, httpError } = require('../utils');

// Create new advertisement
const createAd = async (req, res) => {
  const { name } = req.body;

  const isAdExist = await getExistsDoc(AdModel, { name });

  if (isAdExist) throw httpError(409, 'Advertisement already exists');

  const newAd = await AdModel.create(req.body);

  res.status(201).json(newAd);
};

// Edit advertisement information
const updateAdData = async (req, res) => {
  const { adId } = req.params;
  const { name } = req.body;

  const isAdExist = await getExistsDoc(AdModel, { name });

  if (isAdExist) throw httpError(409, 'Advertisement already exists.');

  const updatedAd = await updateDocByID(AdModel, adId, req.body);

  if (!updatedAd) throw httpError(404, 'Advertisement not found.');

  res.status(200).json(updatedAd);
};

// Get all advertisements
const getAllAds = async (req, res) => {
  const allAds = await AdModel.find().populate('show').populate('customer').populate('agent').select('-createdAt -updatedAt');

  if (!allAds.length) res.status(200).json({ message: 'There are no advertisements in the database.' });

  res.status(200).json(allAds);
};

// Get  advertisement by ID
const getAdById = async (req, res) => {
  const { adId } = req.params;

  const ad = await getDocByID(AdModel, adId);

  if (!ad) throw httpError(404, 'Advertisement not found.');

  res.status(200).json(ad);
};

// Delete advertisement
const deleteAd = async (req, res) => {
  const { adId } = req.params;

  const isAdExist = await AdModel.findById(adId);

  if (!isAdExist) throw httpError(404, 'The advertisement does not exist or has been deleted.');

  await AdModel.findByIdAndDelete(adId);

  res.status(204).send();
};

module.exports = {
  createAd: ctrlWrapper(createAd),
  updateAdData: ctrlWrapper(updateAdData),
  getAllAds: ctrlWrapper(getAllAds),
  getAdById: ctrlWrapper(getAdById),
  deleteAd: ctrlWrapper(deleteAd),
};
