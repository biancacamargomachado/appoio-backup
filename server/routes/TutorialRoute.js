const express = require('express');
const multer = require('multer')
const tutorialController = require('../controllers/TutorialController');
var storage = require('../helper/ImageHandler');

const router = express.Router();

const upload = multer({ storage: storage }).single('file');

// Rota para registrar um tutorial
router.route('/registration').post(upload, tutorialController.register);

//Rota para acessar tutorias de uma categoria específica
router.route('/:category').get(tutorialController.getAll);

module.exports = router;
