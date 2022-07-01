const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { doQuery, systemError } = require('../helpers/dbHelpers');
const { jwtSecret } = require('../config');

const tableName = 'users';

async function userRegisterDB(email, password) {
  try {
    const sqlQuery = `
        INSERT INTO ${tableName} (email, password)
        VALUES (?, ?)
        `;
    const [data] = await doQuery(sqlQuery, [email, password]);

    if (!data.insertId) {
      return systemError;
    }
    return { isSuccess: true, userID: data.insertId };
  } catch (error) {
    if (error.errno === 1062 && error.sqlState === '23000') {
      return {
        isSuccess: false,
        err: 'This email already used',
      };
    }
    console.log(error);
    return systemError;
  }
}

async function userLoginDB(email, password) {
  try {

    const sqlQuery = `
          SELECT * FROM ${tableName} 
          WHERE email = ?
          LIMIT 1
          `;
    const [data] = await doQuery(sqlQuery, [email]);


    if (data.length !== 1) {
      return { isSuccess: false, err: 'Email or password incorrect' };
    }

    const passwordComparison = bcrypt.compareSync(password, data[0].password);

    if (!passwordComparison) {
      return { isSuccess: false, err: 'Email or password incorrect' };
    }

    const token = jwt.sign({ userId: data[0].id }, jwtSecret);

    return {
      isSuccess: true,
      msg: 'Successfully logged in',
      token,
    };
  } catch (error) {
    console.log(error);
    return systemError;
  }
}

module.exports = {
  userRegisterDB,
  userLoginDB,
};
