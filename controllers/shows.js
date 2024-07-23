const { ShowModel } = require('../models');
const { getExistsDoc, getAllDocs, updateDocByID, getDocByID } = require('../services');
const { ctrlWrapper, httpError } = require('../utils');
const { userRolesEnum } = require('../constants');

// Create new show
const createShow = async (req, res) => {
  const { name } = req.body;
  const { role } = req.user;

  if (role === userRolesEnum.MIDDLE) throw httpError(403, 'Role "middle" does not have rights to this action.');

  const isShowExist = await getExistsDoc(ShowModel, { name });

  if (isShowExist) throw httpError(409, 'Show already exists.');

  const newShow = await ShowModel.create(req.body);

  res.status(201).json(newShow);
};

// Edit show information
const updateShowData = async (req, res) => {
  const { showId } = req.params;
  const { name } = req.body;
  const { role } = req.user;

  if (role === userRolesEnum.MIDDLE) throw httpError(403, 'Role "middle" does not have rights to this action.');

  const isShowExist = await getExistsDoc(ShowModel, { name });

  const isDifferentShow = !!isShowExist && isShowExist._id.toString() !== showId;
  if (isDifferentShow) throw httpError(409, 'Show already exists.');

  const updatedShowData = await updateDocByID(ShowModel, showId, req.body);

  if (!updatedShowData) throw httpError(404, 'Show not found.');

  res.status(200).json(updatedShowData);
};

// Get all show
const getAllShow = async (req, res) => {
  const allShows = await getAllDocs(ShowModel);

  if (!allShows.length) res.status(200).json({ message: 'There are no shows in the database.' });

  res.status(200).json(allShows);
};

// Get show by ID
const getShowByID = async (req, res) => {
  const { showId } = req.params;

  const show = await getDocByID(ShowModel, showId);

  if (!show) throw httpError(404, 'Show not found.');

  res.status(200).json(show);
};

// Delete show
const deleteShow = async (req, res) => {
  const { showId } = req.params;
  const { role } = req.user;

  if (role !== userRolesEnum.CHIEF) throw httpError(403, 'Role "middle" and "senior" does not have rights to this action.');

  const isShowExist = await getDocByID(ShowModel, showId);

  if (!isShowExist) throw httpError(404, 'The agent does not exist or has been deleted.');

  await ShowModel.findByIdAndDelete(showId);

  res.status(204).send();
};

module.exports = {
  createShow: ctrlWrapper(createShow),
  updateShowData: ctrlWrapper(updateShowData),
  getAllShow: ctrlWrapper(getAllShow),
  getShowByID: ctrlWrapper(getShowByID),
  deleteShow: ctrlWrapper(deleteShow),
};
