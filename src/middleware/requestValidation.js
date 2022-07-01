const { verifyJwtToken } = require('../helpers/helpers');
const { failResponse } = require('../helpers/responseHelper');

const schemaValidation = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponse(res, formatedError);
  }
};

async function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return failResponse(res, 'no token', 401);
  const verifyResult = verifyJwtToken(tokenGotFromUser);

  if (verifyResult === false) return failResponse(res, 'invalid token', 403);
  req.userId = verifyResult.userId;
  next();
}

module.exports = {
  schemaValidation,
  validateToken,
};
