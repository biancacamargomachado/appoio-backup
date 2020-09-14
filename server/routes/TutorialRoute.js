const express = require('express');
const tutorialController = require('../controllers/TutorialController');

const router = express.Router();

// Rota para registrar um tutorial
router.route('/registration').post(tutorialController.register);

//Rota para acessar tutorias de uma categoria específica
router.route('/:category').get(tutorialController.getAll);

module.exports = router;
