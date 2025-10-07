const express = require('express');
const { handleLogin, handleRegister } = require('../controllers/loginController.js');

const loginRouter = express.Router();

loginRouter.post('/login', handleLogin);
loginRouter.post('/register', handleRegister);


module.exports = loginRouter;