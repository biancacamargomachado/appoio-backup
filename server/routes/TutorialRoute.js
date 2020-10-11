const express = require('express');
const multer = require('multer')
const tutorialController = require('../controllers/TutorialController');
const storage = require('../helper/ImageHandler');

const router = express.Router();

const upload = multer({ storage: storage }).array('images');

//Rota para acessar tutorial por id
router.route('/id/:id').get(tutorialController.get);

//Rota para acessar tutoriais de todas categorias
router.route('/categories').get(tutorialController.getAll);

// Rota para registrar um tutorial
router.route('/registration').post(upload, tutorialController.register);

// Rota para deletar um tutorial
router.delete('/delete/:id',
    authHandler.adminAuth(),
    async (req, res) => {
        return res.json(tutorialController.deleteTutorial(req.params.id));
    });

module.exports = router;
