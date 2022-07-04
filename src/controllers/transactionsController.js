const { makeResponce } = require('../helpers/responseHelper');
const {
  insertTransaction,
  updateTransaction,
  removeTransaction,
  queryTransaction,
  queryTransactions,
} = require('../models/transactionsModel');

async function createTransaction(req, resp) {
  const { userId } = req;
  const { groupId, transactionDate, amount, comment } = req.body;

  const insertResult = await insertTransaction(
    userId,
    groupId,
    transactionDate,
    amount,
    comment
  );
  return makeResponce(resp, insertResult);
}

async function modifyTransaction(req, resp) {
  const { userId } = req;
  const { id, groupId, transactionDate, amount, comment } = req.body;
  const updateResult = await updateTransaction(id, userId, groupId, transactionDate, amount, comment);
  return makeResponce(resp, updateResult);
}

async function deleteTransaction(req, resp) {
  const { userId } = req;
  const { transactionId } = req.body;
  const deleteResult = await removeTransaction(userId, transactionId);
  return makeResponce(resp, deleteResult);
}

async function listTransactions(req, resp) {
  const { userId } = req;
  const queryResult = await queryTransactions(userId);
  return makeResponce(resp, queryResult, queryResult.transactions);
}

async function getTransaction(req, resp) {
  const { userId } = req;
  const { id } = req.params;
  const queryResult = await queryTransaction(userId, id);
  return makeResponce(resp, queryResult, queryResult.transaction);
}

module.exports = {
  getTransaction,
  listTransactions,
  createTransaction,
  modifyTransaction,
  deleteTransaction,
};
