const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();


router.route('/login').post(userController.login);
router.route('/registration').post(userController.register);


module.exports = router;