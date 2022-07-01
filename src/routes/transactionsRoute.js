const express = require('express');
const {
  createTransaction,
  modifyTransaction,
  listTransaction,
  getTransaction,
  deleteTransaction,
} = require('../controllers/transactionsController');
const {
  validateToken,
  schemaValidation,
} = require('../middleware/requestValidation');
const {
    transactionSchema,
    transactionSchemaDelete,
    transactionSchemaModify,
} = require('../middleware/validationSchemas');

const transactionRoutes = express.Router();

transactionRoutes.post(
  '/',
  [validateToken, schemaValidation(transactionSchema)],
  createTransaction
);
transactionRoutes.put(
  '/',
  [validateToken, schemaValidation(transactionSchemaModify)],
  modifyTransaction
);
transactionRoutes.get('/', validateToken, listTransaction);
transactionRoutes.get('/:id', validateToken, getTransaction);
transactionRoutes.delete(
  '/',
  [validateToken, schemaValidation(transactionSchemaDelete)],
  deleteTransaction
);

module.exports = transactionsRoutes;
