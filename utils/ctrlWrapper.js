const ctrlWrapper = (ctrlFunc) => {
    const fn = async (req, res, next) => {
        try {
            await ctrlFunc(req, res);
        } catch (err) {
            next(err);
        }
    };
    return fn;
};

module.exports = ctrlWrapper;
