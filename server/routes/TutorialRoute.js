const express = require('express');
const multer = require('multer');
const tutorialController = require('../controllers/TutorialController');
const storage = require('../helper/ImageHandler');

const router = express.Router();

const upload = multer({ storage: storage }).array('images');


router.route('/id/:id').get(tutorialController.get);
router.route('/categories').get(tutorialController.getAll);
router.route('/registration').post(upload, tutorialController.register);


module.exports = router;
