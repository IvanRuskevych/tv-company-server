const { ShowModel } = require('../models');
const { getExistsDoc, getAllDoc } = require('../services');
const { ctrlWrapper, httpError } = require('../utils');

// Create new show
const createShow = async (req, res) => {
    const { name, rating, pricePerCommercial } = req.body;

    const isShowExist = await getExistsDoc(ShowModel, { name });
    if (isShowExist) throw httpError(409, 'Show already exists');

    const result = await ShowModel.create({ name, rating, pricePerCommercial });

    res.status(201).json(result);
};

// Get all show
const getAllShow = async (req, res) => {
    const allShows = await getAllDoc(ShowModel);

    if (!allShows.length) res.status(200).json({ message: 'There are no shows in the database' });

    res.status(200).json(allShows);
};

module.exports = {
    createShow: ctrlWrapper(createShow),
    getAllShow: ctrlWrapper(getAllShow),
};
