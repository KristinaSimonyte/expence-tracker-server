const Joi = require('joi');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const userSchema = Joi.object({
    email: Joi.string().email().min(7).max(100).lowercase().trim().required(),
    password: Joi.string().min(6).max(100).trim().required(),
});

async function userRegisterDB (email, password) {
    try {
    const connection = await mysql.createConnection(dbConfig);
    const sqlQuery = `
        INSERT INTO users (email, password)
        VALUES (${mysql.escape(email)}, '${password}')
        `;
    const [data] = await connection.execute(sqlQuery);
    if (!data.insertId) {
      return false
    } return { userID: data.insertId}
} catch (error) {
    console.log(error);
    return false;
}

}

module.exports = {
    userSchema,
    userRegisterDB,
};