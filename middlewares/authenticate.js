const { verifyToken, getUserById } = require('../services');
const { httpError } = require('../utils');

const { KEY_ACCESS_TOKEN } = process.env;

module.exports.authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') next(httpError(401, 'Not authorized'));

  try {
    const { payload: userId } = verifyToken(token, KEY_ACCESS_TOKEN);
    const { name, phone, accessToken } = await getUserById(userId, 'name phone accessToken -_id');

    if (accessToken !== token) next(httpError(401, 'The token is not valid'));

    // set user data to req for using in controllers
    req.user = { name, phone };

    next();
  } catch (err) {
    next(httpError(401, 'Not authorized'));
  }
};
