const { CommercialModel } = require('../models');
const { getExistsDoc, updateDocByID, getDocByID } = require('../services');
const { ctrlWrapper, httpError } = require('../utils');
const { userRolesEnum } = require('../constants');

// Create new Commercial
const createCommercial = async (req, res) => {
  const { name } = req.body;
  const { role } = req.user;

  if (role === userRolesEnum.MIDDLE) throw httpError(403, 'Role "middle" does not have rights to this action.');

  const isCommercialExist = await getExistsDoc(CommercialModel, { name });

  if (isCommercialExist) throw httpError(409, 'Commercial already exists');

  const newCommercial = await CommercialModel.create(req.body);

  res.status(201).json(newCommercial);
};

// Edit Commercial information
const updateCommercialData = async (req, res) => {
  const { commercialId } = req.params;
  const { name } = req.body;
  const { role } = req.user;

  if (role === userRolesEnum.MIDDLE) throw httpError(403, 'Role "middle" does not have rights to this action.');

  const isCommercialExist = await getExistsDoc(CommercialModel, { name });
  const isDifferentCommercial = !!isCommercialExist && isCommercialExist._id.toString() !== commercialId;

  if (isDifferentCommercial) throw httpError(409, 'Commercial already exists.');

  const updatedCommercial = await updateDocByID(CommercialModel, commercialId, req.body);

  if (!updatedCommercial) throw httpError(404, 'Commercial not found.');

  res.status(200).json(updatedCommercial);
};

// Get all commercials
const getAllCommercials = async (req, res) => {
  const allCommercials = await CommercialModel.find().populate('show').populate('customer').populate('agent').select('-createdAt -updatedAt');

  if (!allCommercials.length) res.status(200).json({ message: 'There are no commercials in the database.' });

  res.status(200).json(allCommercials);
};

// Get commercial by ID
const getCommercialById = async (req, res) => {
  const { commercialId } = req.params;

  const commercial = await getDocByID(CommercialModel, commercialId);

  if (!commercial) throw httpError(404, 'Commercial not found.');

  res.status(200).json(commercial);
};

// Delete commercial
const deleteCommercial = async (req, res) => {
  const { commercialId } = req.params;
  const { role } = req.user;

  if (role !== userRolesEnum.CHIEF) throw httpError(403, 'Role "middle" and "senior" does not have rights to this action.');

  const isCommercialExist = await CommercialModel.findById(commercialId);

  if (!isCommercialExist) throw httpError(404, 'The commercial does not exist or has been deleted.');

  await CommercialModel.findByIdAndDelete(commercialId);

  res.status(204).send();
};

module.exports = {
  createCommercial: ctrlWrapper(createCommercial),
  updateCommercialData: ctrlWrapper(updateCommercialData),
  getAllCommercials: ctrlWrapper(getAllCommercials),
  getCommercialById: ctrlWrapper(getCommercialById),
  deleteCommercial: ctrlWrapper(deleteCommercial),
};
