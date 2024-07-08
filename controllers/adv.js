const { AdvModel } = require('../models');
const { getExistsDoc, updateDocByID, getDocByID } = require('../services');
const { ctrlWrapper, httpError } = require('../utils');

// Create new advertisement
const createAdv = async (req, res) => {
  const { name } = req.body;

  const isAdvExist = await getExistsDoc(AdvModel, { name });

  if (isAdvExist) throw httpError(409, 'Advertisement already exists');

  const newAdv = await AdvModel.create(req.body);

  res.status(201).json(newAdv);
};

// Edit advertisement information
const updateAdv = async (req, res) => {
  const { advId } = req.params;

  const updatedAdv = await updateDocByID(AdvModel, advId, req.body);

  if (!updatedAdv) throw httpError(404, 'Advertisement not found.');

  res.status(200).json(updatedAdv);
};

// Get all advertisements
const getAllAdv = async (req, res) => {
  const allAdv = await AdvModel.find().populate('show').populate('customer').populate('agent').select('-createdAt -updatedAt');

  if (!allAdv.length) res.status(200).json({ message: 'There are no advertisements in the database.' });

  res.status(200).json(allAdv);
};

// Get  advertisement by ID
const getAdvById = async (req, res) => {
  const { advId } = req.params;

  const adv = await getDocByID(AdvModel, advId);

  if (!adv) throw httpError(404, 'Advertisement not found.');

  res.status(200).json(adv);
};

// Delete advertisement
const deleteAdv = async (req, res) => {
  const { advId } = req.params;

  const isAdvExist = await AdvModel.findById(advId);

  if (!isAdvExist) throw httpError(404, 'The advertisement does not exist or has been deleted.');

  await AdvModel.findByIdAndDelete(advId);

  res.status(204).send();
};

module.exports = {
  createAdv: ctrlWrapper(createAdv),
  updateAdv: ctrlWrapper(updateAdv),
  getAllAdv: ctrlWrapper(getAllAdv),
  getAdvById: ctrlWrapper(getAdvById),
  deleteAdv: ctrlWrapper(deleteAdv),
};
