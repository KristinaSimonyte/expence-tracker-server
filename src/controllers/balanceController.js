const { makeResponce } = require('../helpers/responseHelper');
const { getBalance } = require('../models/balanceModel');

async function getUserBalance(req, resp) {
    const { userId } = req;
    const queryResult = await getBalance(userId);
    return makeResponce(resp, queryResult, queryResult.balance);
  }

  module.exports= {
    getUserBalance,
  }