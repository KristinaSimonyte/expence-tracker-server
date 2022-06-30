const Joi = require('joi');
const { failResponse } = require('../helpers/dbHelper');
const { verifyJwtToken } = require('../helpers/helpers');

async function userValidation(req, res, next) {
  const userSchema = Joi.object({
    email: Joi.string().email().min(7).max(100).lowercase().trim().required(),
    password: Joi.string().min(6).max(100).trim().required(),
  });

  try {
    await userSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponse(res, formatedError);
  }
}

async function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return failResponse(res, 'no token', 401);
  const verifyResult = verifyJwtToken(tokenGotFromUser);
  if (verifyResult === false) return failResponse(res, 'invalid token', 403);
  req.userId = verifyResult.id;
  next();
}

module.exports = {
  userValidation,
  validateToken,
};
