const { makeResponce } = require('../helpers/responseHelper');
const { insertGroup, updateGroup, queryGroups, queryGroup, removeGroup } = require('../models/groupsModel');

async function createGroup(req, resp) {
  const { userId } = req;
  const { title, type } = req.body;

  const insertResult = await insertGroup(userId, type, title);
  return makeResponce(resp, insertResult);
}

async function modifyGroup(req, resp) {
  const { userId } = req;
  const { id, title, type } = req.body;
  const updateResult = await updateGroup(id, userId, type, title);
  return makeResponce(resp, updateResult);
}

async function deleteGroup(req, resp) {
  const { userId } = req;
  const { groupId } = req.body;
  const deleteResult = await removeGroup(userId, groupId);
  return makeResponce(resp, deleteResult);
}

async function listGroups(req, resp) {
  const { userId } = req;
  const queryResult = await queryGroups(userId);
  return makeResponce(resp, queryResult, queryResult.groups);
}

async function getGroup(req, resp) {
  const { userId } = req;
  const { id } = req.params;
  const queryResult = await queryGroup(userId, id);
  return makeResponce(resp, queryResult, queryResult.group);
}

module.exports = {
  getGroup,
  listGroups,
  createGroup,
  modifyGroup,
  deleteGroup,
};
