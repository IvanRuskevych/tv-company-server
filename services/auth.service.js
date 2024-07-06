const { UserModel } = require('../models');

module.exports.userExists = async (employeeID, password) =>
    await UserModel.exists({
        employeeID,
        password,
    }).select('_id role');

module.exports.userUpdatedDataByID = async (id, accessToken, refreshToken) =>
    await UserModel.findByIdAndUpdate(id, { accessToken, refreshToken }, { new: true }).select(
        'name phone accessToken refreshToken -_id',
    );
