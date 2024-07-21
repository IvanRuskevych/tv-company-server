const { UserModel } = require('../models');
const { getExistsDoc, updateDocByID, createToken, verifyToken } = require('../services');
const { httpError, ctrlWrapper } = require('../utils');
const { userRolesEnum } = require('../constants');

const { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } = process.env;

const login = async (req, res) => {
  const { employeeID, password } = req.body;

  // find user by employeeID & password
  const isUserExists = await getExistsDoc(UserModel, { employeeID, password });

  if (!isUserExists) {
    throw httpError(401, 'Employee ID or password is wrong');
  }
  const { _id: userId, role } = isUserExists;

  if (role === userRolesEnum.JUNIOR) {
    throw httpError(403, 'You have no access rights');
  }

  // create tokens
  const accToken = createToken(userId, KEY_ACCESS_TOKEN, '1h');
  const refToken = createToken(userId, KEY_REFRESH_TOKEN, '9h');

  // Update user data by adding accessToken & refreshToken
  const { accessToken, refreshToken } = await updateDocByID(UserModel, userId, { accessToken: accToken, refreshToken: refToken });

  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

const logout = async (req, res) => {
  const { userId } = req.user;

  await updateDocByID(UserModel, userId, { accessToken: '', refreshToken: '' });

  res.status(200).json({ message: 'Logout successful' });
};

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  const isTokenExists = await getExistsDoc(UserModel, { refreshToken: token });
  if (!isTokenExists) throw httpError(403, 'Refresh token does not valid');

  // create tokens
  const { payload: userId } = verifyToken(token, KEY_REFRESH_TOKEN);
  const accToken = createToken(userId, KEY_ACCESS_TOKEN, '1h');
  const refToken = createToken(userId, KEY_REFRESH_TOKEN, '9h');

  // update user data with new tokens
  const { accessToken, refreshToken } = await updateDocByID(UserModel, userId, { accessToken: accToken, refreshToken: refToken });

  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

module.exports = {
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
};
