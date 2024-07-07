const { httpError } = require('../utils');

module.exports.validateBody = (schema) => {
    const fn = (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) next(httpError(400, error.message));

        next();
    };
    return fn;
};
