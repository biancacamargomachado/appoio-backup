const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

// Rota para logar um usuário
router.route('/login').post(userController.login);

// Rota para cadastrar um usuário
router.route('/registration').post(userController.register);


module.exports = router;