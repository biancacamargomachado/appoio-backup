const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Rota para logar um usuário
router.route('/login').post(UserController.login);

// Rota para cadastrar um usuário
router.route('/registration').post(UserController.register);

module.exports = router;
