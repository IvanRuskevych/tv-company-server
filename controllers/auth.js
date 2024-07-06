const { UserModel } = require('../models');
const { userUpdatedDataByID, userExists, createToken } = require('../services');
const { httpError, ctrlWrapper } = require('../utils');
const { userRolesEnum, secretKey } = require('../constants');

const login = async (req, res) => {
    const { employeeID, password } = req.body;

    // find user by employeeID & password
    const { _id: id, role } = await userExists(employeeID, password);

    if (!id) {
        throw httpError(401, 'Employee ID or password is wrong');
    }

    if (role === userRolesEnum.JUNIOR) {
        throw httpError(403, 'You have no access rights');
    }

    // create tokens
    const accToken = createToken(id, secretKey.ACCESS, '1h');
    const refToken = createToken(id, secretKey.REFRESH, '9h');

    // Update user data
    const { name, phone, accessToken, refreshToken } = await userUpdatedDataByID(id, accToken, refToken);

    res.status(200).json({
        user: { name, phone },
        tokens: {
            accessToken,
            refreshToken,
        },
    });
};

const current = async (req, res) => {
    const { employeeID } = req.body;
    const user = await UserModel.exists({ employeeID });

    res.status(200).json({ user });
};

module.exports = { login: ctrlWrapper(login), current: ctrlWrapper(current) };
