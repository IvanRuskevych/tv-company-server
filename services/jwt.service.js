const jwt = require('jsonwebtoken');

module.exports.createToken = (payload, key, time) =>
    jwt.sign({ payload }, key, { expiresIn: time });
