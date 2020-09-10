const express = require('express');
const tutorialController = require('../controllers/TutorialController');
const router = express.Router();

// Rota para registrar um tutorial
router.route('/registration').post(tutorialController.register);

module.exports = router;

//routes>controller>services>repository>model