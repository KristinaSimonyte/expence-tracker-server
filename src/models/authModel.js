const mysql = require('mysql2/promise');
const { dbConfig, jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const tableName = 'users';

async function userRegisterDB(email, password) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sqlQuery = `
        INSERT INTO ${tableName} (email, password)
        VALUES (${mysql.escape(email)}, '${password}')
        `;
    const [data] = await connection.execute(sqlQuery, [email, password]);
    await connection.close();

    if (!data.insertId) {
      return false;
    }
    return { userID: data.insertId };
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function userLoginDB(email, password) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sqlQuery = `
          SELECT * FROM ${tableName} 
          WHERE email = (${mysql.escape(email)})
          LIMIT 1
          `;
    const [data] = await connection.execute(sqlQuery, [email]);
    await connection.close();
    if (data.length !== 1) {
      return res.status(400).send({ err: 'Email or password incorrect' });
    }

    const passwordComparison = bcrypt.compareSync(
      password,
      data[0].password
    );

    if (!passwordComparison) {
      return false;
    }
console.log(jwtSecret);
    const token = jwt.sign({ userId: data[0].id }, jwtSecret);

    return {
        msg: 'Successfully logged in',
        token,
    }

  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  userRegisterDB,
  userLoginDB,
};
