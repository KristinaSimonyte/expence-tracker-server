const userValidation = require('../middleware/userValidation');
const { userSchema } = require('../models/authModel');
const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register', userValidation(userSchema), authController.userRegister);

module.exports = authRouter;
