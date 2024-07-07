module.exports.getExistsDoc = async (model, filters) => await model.exists({ ...filters });
module.exports.getAllDoc = async (model) => await model.find();
module.exports.updateDocByID = async (model, id, data) => await model.findByIdAndUpdate(id, { ...data });
