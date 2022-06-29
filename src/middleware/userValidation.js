const userValidation = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.validateAsync(req.body);
        return next();
    } catch (err) {
        return res.status(400).send({ msg: 'Incorrect user data passed' });
    }
};

module.exports = userValidation;

