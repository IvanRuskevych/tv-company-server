const { ShowModel } = require('../models');
const { isShowExist } = require('../services');
const { ctrlWrapper, httpError } = require('../utils');

// Create new show
const createShow = async (req, res) => {
    const { name, rating, pricePerCommercial } = req.body;

    const isExist = await isShowExist(ShowModel, { name });
    if (isExist) throw httpError(409, 'Show already exists');

    const result = await ShowModel.create({ name, rating, pricePerCommercial });

    res.status(201).json(result);
};

// Get all show
const getAllShow = async (req, res) => {
    const allShows = await ShowModel.find();
    res.status(200).json(allShows);
};

module.exports = {
    createShow: ctrlWrapper(createShow),
    getAllShow: ctrlWrapper(getAllShow),
};
