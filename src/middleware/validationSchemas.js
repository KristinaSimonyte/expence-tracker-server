const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().min(7).max(100).lowercase().trim().required(),
  password: Joi.string().min(6).max(100).trim().required(),
});
const groupSchema = Joi.object({
  type: Joi.string().valid('INCOME', 'OUTCOME'),
  title: Joi.string().min(4).max(200).trim().required(),
});
const groupSchemaModify = Joi.object({
  id: Joi.number().integer().required(),
  type: Joi.string().valid('INCOME', 'OUTCOME'),
  title: Joi.string().min(4).max(200).trim().required(),
});
const groupSchemaDelete = Joi.object({
  groupId: Joi.number().integer().required(),
});
const transactionSchema = Joi.object({
  groupId: Joi.number().integer().required(),
  comment: Joi.string().allow(null, ''),
  amount: Joi.number().positive().required(),
  transactionDate: Joi.date().iso().required(),
});
const transactionSchemaModify = Joi.object({
  id: Joi.number().integer().required(),
  groupId: Joi.number().integer().required(),
  comment: Joi.string().allow(null, ''),
  amount: Joi.number().positive().required(),
  transactionDate: Joi.date().iso().required(),
});
const transactionSchemaDelete = Joi.object({
  transactionId: Joi.number().integer().required(),
});

module.exports = {
  userSchema,
  groupSchema,
  groupSchemaModify,
  groupSchemaDelete,
  transactionSchemaDelete,
  transactionSchemaModify,
  transactionSchema,
};
