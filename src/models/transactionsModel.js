const { doQuery, systemError, noDataFound } = require('../helpers/dbHelpers');

const tableName = 'transactions';

async function insertTransaction(
  userId,
  groupId,
  transactionDate,
  amount,
  comment
) {
  try {
    const sqlQuery = `
            INSERT INTO ${tableName} (user_id, group_id, transaction_date, amount, comment)
            VALUES (?, ?, ?, ?, ?)
            `;
    const [data] = await doQuery(sqlQuery, [
      userId,
      groupId,
      transactionDate,
      amount,
      comment,
    ]);
    if (!data.insertId) {
      return {
        isSuccess: false,
        err: 'Technical error please contact to system owner',
      };
    }
    return { isSuccess: true, transactionId: data.insertId };
  } catch (error) {
    if (error.errno === 1062 && error.sqlState === '23000') {
      return {
        isSuccess: false,
        err: 'This transaction already exsits',
      };
    }
    console.log(error);
    return systemError;
  }
}
async function updateTransaction(
  id,
  userId,
  groupId,
  transactionDate,
  amount,
  comment
) {
  try {
    const sqlQuery = `
        UPDATE ${tableName}
          SET group_id =?,
           transaction_date = ?, 
           amount = ?,
           comment = ?
         WHERE user_id = ?
            and id = ? `;
    const [data] = await doQuery(sqlQuery, [
      groupId,
      transactionDate,
      amount,
      comment,
      userId,
      id,
    ]);

    if (data.changedRows < 1) {
      return systemError;
    }
    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return systemError;
  }
}

async function removeTransaction(userId, id) {
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

async function queryTransaction(userId, id) {
  try {
    const sqlQuery = `
            select * from ${tableName}
             WHERE user_id = ?
                and id = ? `;
    const [data] = await doQuery(sqlQuery, [userId, id]);

    if (data.length < 1) {
      return noDataFound;
    }
    return { isSuccess: true, transaction: data };
  } catch (error) {
    console.log(error);
    return systemError;
  }
}

async function queryTransactions(userId) {
  try {
    const sqlQuery = `
        select * from ${tableName}
         WHERE user_id = ? `;
    const [data] = await doQuery(sqlQuery, [userId]);

    if (data.length < 1) {
      return noDataFound;
    }
    return { isSuccess: true, transactions: data };
  } catch (error) {
    console.log(error);
    return systemError;
  }
}

module.exports = {
  insertTransaction,
  updateTransaction,
  removeTransaction,
  queryTransaction,
  queryTransactions,
};
