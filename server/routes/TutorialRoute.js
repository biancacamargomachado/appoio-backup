const express = require('express');
const tutorialController = require('../controllers/tutorialController');

const router = express.Router();

//Rota para acessar a categoria celular
router.route('/celular').get(tutorialController.verCelular);

module.exports = router;