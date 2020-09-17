const express = require('express');
const multer = require('multer')
const tutorialController = require('../controllers/TutorialController');
var storage = require('../helper/ImageHandler');

const router = express.Router();

const upload = multer({ storage: storage }).single('file');

// Rota para registrar um tutorial
router.route('/registration').post(upload, tutorialController.register);

//Rota para acessar tutoriais de uma categoria específica
router.route('/category/:category').get(tutorialController.getAll);

//Rota para acessar tutorial por id
router.route('/:id').get(tutorialController.get);

module.exports = router;
