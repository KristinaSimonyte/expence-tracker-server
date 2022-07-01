const { doQuery, systemError, noDataFound } = require('../helpers/dbHelpers');

async function getBalance(userId) {
  try {
    const sqlQuery = `
    SELECT total_income_amount, total_outcome_amount, (total_income_amount - total_outcome_amount) balance
    FROM (select sum(if(STRCMP(iog.type, 'INCOME') = 0, amount, 0))  total_income_amount,
                 sum(if(STRCMP(iog.type, 'OUTCOME') = 0, amount, 0)) total_outcome_amount
          FROM transactions trns
                   LEFT JOIN income_outcome_groups iog ON trns.group_id = iog.id
                   WHERE iog.user_id = ? ) balance
         `;
    const [data] = await doQuery(sqlQuery, [userId]);

    if (data.length < 1) {
      return noDataFound;
    }
    return { isSuccess: true, balance: data };
  } catch (error) {
    console.log(error);
    return systemError;
  }
}

module.exports = {
  getBalance,
};
