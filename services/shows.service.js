const { ShowModel } = require('../models');

module.exports.isShowExist = async (model, filters) => await model.exists({ ...filters });
