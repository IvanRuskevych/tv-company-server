const { UserModel } = require('../models');
const { verifyToken, getDocByID } = require('../services');
const { httpError } = require('../utils');

const { KEY_ACCESS_TOKEN } = process.env;

module.exports.authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') next(httpError(401, 'Not authorized'));

  try {
    const { payload: userId } = verifyToken(token, KEY_ACCESS_TOKEN);

    const { name, phone, role, accessToken, _id } = await getDocByID(UserModel, userId).select('-password -refreshToken -employeeID');

    if (accessToken !== token) next(httpError(401, 'Not authorized'));

    // set user data to req for using in controllers
    req.user = { name, phone, role, userId: _id };

    next();
  } catch (err) {
    next(httpError(401, 'Not authorized'));
  }
};
