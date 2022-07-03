const { doQuery, systemError, noDataFound } = require('../helpers/dbHelpers');

const tableName = 'income_outcome_groups';

async function insertGroup(userId, type, title) {
  try {
    const sqlQuery = `
            INSERT INTO ${tableName} (user_id, type, group_title)
            VALUES (?, ?, ?)
            `;
    const [data] = await doQuery(sqlQuery, [userId, type, title]);
    if (!data.insertId) {
      return {
        isSuccess: false,
        err: 'Technical error please contact to system owner',
      };
    }
    return { isSuccess: true, groupId: data.insertId };
  } catch (error) {
    if (error.errno === 1062 && error.sqlState === '23000') {
      return {
        isSuccess: false,
        err: 'This group already exsits',
      };
    }
    console.log(error);
    return systemError;
  }
}
async function updateGroup(id, userId, type, title) {
  try {
    const sqlQuery = `
        UPDATE ${tableName}
          SET type = ?, 
              group_title = ?
         WHERE user_id = ?
            and id = ? `;
    const [data] = await doQuery(sqlQuery, [type, title, userId, id]);

    if (data.changedRows < 1) {
      return systemError;
    }
    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return systemError;
  }
}

async function removeGroup(userId, id) {
  try {
    const sqlQuery = `
            delete from ${tableName}
             WHERE user_id = ?
                and id = ? `;
    const [data] = await doQuery(sqlQuery, [userId, id]);
    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return systemError;
  }
}

async function queryGroup(userId, id) {
  try {
    const sqlQuery = `
            select * from ${tableName}
             WHERE user_id = ?
                and id = ? `;
    const [data] = await doQuery(sqlQuery, [userId, id]);

    if (data.length < 1) {
      return noDataFound;
    }
    return { isSuccess: true, group: data };
  } catch (error) {
    console.log(error);
    return systemError;
  }
}

async function queryGroups(userId) {
  try {
    const sqlQuery = `
        select * from ${tableName}
         WHERE user_id = ? `;
    const [data] = await doQuery(sqlQuery, [userId]);

    if (data.length < 1) {
      return [];
    }
    return { isSuccess: true, groups: data };
  } catch (error) {
    console.log(error);
    return systemError;
  }
}

module.exports = {
  insertGroup,
  updateGroup,
  removeGroup,
  queryGroup,
  queryGroups,
};
