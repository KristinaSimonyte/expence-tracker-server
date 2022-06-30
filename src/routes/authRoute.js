const { userValidation } = require('../middleware/userValidation');
const express = require('express');
const authController = require('../controllers/authController');

const authRoutes = express.Router();

authRoutes.post('/register', userValidation, authController.register);
authRoutes.post('/login', userValidation, authController.login);


module.exports = authRoutes;
