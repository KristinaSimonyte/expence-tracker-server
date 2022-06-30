const { successResponse, failResponse } = require('../helpers/dbHelper');
const { hashPass, generateJwtToken } = require('../helpers/helpers');
const { userRegisterDB, userLoginDB } = require('../models/authModel');

async function register(req, res) {
  const { email, password } = req.body;
  const hashedPassword = hashPass(password);
  const insertResult = await userRegisterDB(email, hashedPassword);
  return insertResult === false
    ? failResponse(res)
    : successResponse(res, 'user created');
}
async function login(req, res) {
  const { email, password } = req.body;
  const findResults = await userLoginDB(email, password);
  if (findResults === false) return failResponse(res);

  const token = generateJwtToken(findResults);
  return successResponse(res, token);
}

module.exports = {
  register,
  login,
};