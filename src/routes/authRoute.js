const { schemaValidation } = require('../middleware/requestValidation');
const express = require('express');
const authController = require('../controllers/authController');
const { userSchema } = require('../middleware/validationSchemas');


const authRoutes = express.Router();

authRoutes.post('/register', schemaValidation(userSchema), authController.register);
authRoutes.post('/login', schemaValidation(userSchema), authController.login);

module.exports = authRoutes;
