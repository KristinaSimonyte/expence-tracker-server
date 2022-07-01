require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8080,
    dbConfig: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DB,
    },
    jwtSecret: process.env.JWT_SECRET,
};
