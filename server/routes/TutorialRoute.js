/**
 * @author Fernanda Mello
 */

const express = require('express');
const tutorialController = require('../controllers/tutorialController');

const router = express.Router();

//Rota para acessar tutorias de uma categoria específica
router.route('/:category').get(tutorialController.getAll);

module.exports = router;