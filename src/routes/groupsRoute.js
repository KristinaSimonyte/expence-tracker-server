const express = require('express');
const {
  createGroup,
  modifyGroup,
  listGroups,
  getGroup,
  deleteGroup,
} = require('../controllers/groupsController');
const {
  validateToken,
  schemaValidation,
} = require('../middleware/requestValidation');
const {
  groupSchema,
  groupSchemaDelete,
  groupSchemaModify,
} = require('../middleware/validationSchemas');

const groupsRoutes = express.Router();

groupsRoutes.post(
  '/',
  [validateToken, schemaValidation(groupSchema)],
  createGroup
);
groupsRoutes.put(
  '/',
  [validateToken, schemaValidation(groupSchemaModify)],
  modifyGroup
);
groupsRoutes.get('/', validateToken, listGroups);
groupsRoutes.get('/:id', validateToken, getGroup);
groupsRoutes.delete(
  '/',
  [validateToken, schemaValidation(groupSchemaDelete)],
  deleteGroup
);

module.exports = groupsRoutes;
