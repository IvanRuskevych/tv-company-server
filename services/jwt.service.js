const jwt = require('jsonwebtoken');

module.exports.createToken = (payload, key, time) => jwt.sign({ payload }, key, { expiresIn: time });

module.exports.verifyToken = (token, key) => jwt.verify(token, key);
