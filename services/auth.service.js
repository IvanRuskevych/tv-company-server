const { UserModel } = require('../models');

module.exports.getExistsUser = async (employeeID, password, selectArgs) =>
    await UserModel.exists({
        employeeID,
        password,
    }).select(selectArgs);

module.exports.updateUserDataByID = async (id, accessToken, refreshToken) =>
    await UserModel.findByIdAndUpdate(id, { accessToken, refreshToken }, { new: true }).select(
        'name phone accessToken refreshToken -_id',
    );

module.exports.getUserById = async (userId, selectArgs) => await UserModel.findById(userId).select(selectArgs);
