const { createToken, updateUserDataByID, getExistsUser } = require('../services');
const { httpError, ctrlWrapper } = require('../utils');
const { userRolesEnum } = require('../constants');

const { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } = process.env;

const login = async (req, res) => {
    const { employeeID, password } = req.body;

    // find user by employeeID & password
    const { _id: id, role } = await getExistsUser(employeeID, password, '_id role');

    if (!id) {
        throw httpError(401, 'Employee ID or password is wrong');
    }

    if (role === userRolesEnum.JUNIOR) {
        throw httpError(403, 'You have no access rights');
    }

    // create tokens
    const accToken = createToken(id, KEY_ACCESS_TOKEN, '1h');
    const refToken = createToken(id, KEY_REFRESH_TOKEN, '9h');

    // Update user data
    const { name, phone, accessToken, refreshToken } = await updateUserDataByID(id, accToken, refToken);

    res.status(200).json({
        user: { name, phone },
        tokens: {
            accessToken,
            refreshToken,
        },
    });
};

const currentUser = ({ user }, res) => {
    res.status(200).json({ user });
};

module.exports = { login: ctrlWrapper(login), currentUser: ctrlWrapper(currentUser) };
