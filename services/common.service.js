module.exports.getExistsDoc = (model, filters) => model.exists({ ...filters }).select('role');

module.exports.getAllDocs = (model) => model.find().select('-createdAt -updatedAt');

module.exports.getDocByID = (model, id) => model.findById(id).select('-createdAt -updatedAt');

module.exports.updateDocByID = (model, id, data) => model.findByIdAndUpdate(id, { ...data }, { new: true }).select('-createdAt -updatedAt');
