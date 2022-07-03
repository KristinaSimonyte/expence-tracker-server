const { makeResponce } = require('../helpers/responseHelper');
const { hashPass } = require('../helpers/helpers');
const { userRegisterDB, userLoginDB } = require('../models/authModel');

async function register(req, res) {
  const { email, password } = req.body;
  const hashedPassword = hashPass(password);
  const insertResult = await userRegisterDB(email, hashedPassword);
  return makeResponce(res, insertResult, 'User created successfully.');
}
async function login(req, res) {
  const { email, password } = req.body;
  const findResults = await userLoginDB(email, password);
  return makeResponce(res, findResults, { token: findResults.token });
}
module.exports = {
  register,
  login,
};
