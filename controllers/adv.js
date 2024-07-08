const { AdvModel } = require('../models');
const { getExistsDoc, getAllDoc } = require('../services');
const { ctrlWrapper, httpError } = require('../utils');

// Create new advertisement
const createAdv = async (req, res) => {
  // const isAdvExist = await getExistsDoc({ name });
  // if (!isAdvExist) throw httpError(409, 'Advertisement already exists');

  const newAdv = await AdvModel.create({ ...req.body });

  res.status(201).json(newAdv);
};

// Edit advertisement information
const updateAdv = async (req, res) => {
  const { advId } = req.params;

  const updatedAdv = await AdvModel.findByIdAndUpdate(advId, req.body);

  if (!updatedAdv) throw httpError(404, 'Advertisement not found.');

  res.status(200).json(updatedAdv);
};

// Get all advertisements
const getAllAdv = async (req, res) => {
  const allAdv = await AdvModel.find().populate('show').populate('customer').populate('agent');

  if (!allAdv.length) res.status(200).json({ message: 'There are no advertisements in the database.' });

  res.status(200).json(allAdv);
};

// Get  advertisement  by id
const getAdvById = async (req, res) => {
  const { advId } = req.params;

  const adv = await AdvModel.findById(advId);
  if (!adv) throw httpError(404, 'Advertisement not found.');

  res.status(200).json(adv);
};

// Delete advertisement
const deleteAdv = async (req, res) => {
  const { advId } = req.params;

  const isAdvExist = await getExistsDoc(advId);

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
