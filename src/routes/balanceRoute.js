const express = require('express');
const { getUserBalance } = require('../controllers/balanceController');
const { validateToken } = require('../middleware/requestValidation');


const balanceRoutes = express.Router();

balanceRoutes.get('/', validateToken, getUserBalance);



module.exports = balanceRoutes;