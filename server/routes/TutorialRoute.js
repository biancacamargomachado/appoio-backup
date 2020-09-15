const express = require('express');
const tutorialController = require('../controllers/TutorialController');

const router = express.Router();

// Rota para registrar um tutorial
router.route('/registration').post(tutorialController.register);

//Rota para acessar tutoriais de uma categoria específica
router.route('/category/:category').get(tutorialController.getAll);

//Rota para acessar tutorial por id
router.route('/:id').get(tutorialController.get);

module.exports = router;
