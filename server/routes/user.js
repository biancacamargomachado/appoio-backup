const express = require('express');
const user = require('../controller/user');

const router = express.Router();

//Rota para realizar login
router.route('/login').post(user.login);

//Rota para cadastrar um usuário
router.route('/registration').post(user.register);


module.exports = router;