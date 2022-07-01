const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function doQuery(sqlQuery, queryParametersValue){
    try {

        const connection = await mysql.createConnection(dbConfig);

        const [data] = await connection.execute(sqlQuery, queryParametersValue);

        await connection.end();

        return [data];

      } catch (error) {
        throw(error);
      }

}

const systemError = {
    isSuccess: false,
    err: 'Technical error please contact to system owner',
  };
  const noDataFound = {
    isSuccess: true,
    msg: 'No data found',
  };
module.exports = {
    doQuery,
    systemError,
    noDataFound
}