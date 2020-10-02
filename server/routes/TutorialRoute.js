const express = require('express');
const multer = require('multer');
const tutorialController = require('../controllers/TutorialController');
const storage = require('../helper/ImageHandler');


module.exports = function (userAuth, adminAuth) {
    const router = express.Router();
    const upload = multer({ storage: storage }).array('images');

    router.route('/get/:id').get(
        (req, res) => {
            return res.json(tutorialController.get(req.params.id));
        }
    );

    router.route('/categories').get(
        adminAuth({
            'approved': 0
        }),
        (req, res) => {
            return res.json(tutorialController.getAll(req.body.approved));
        }
    );

    router.route('/registration').post(
        upload,
        userAuth,
        (req, res) => {
            try {
                let creationObject = req.body;

                if (creationObject.appId)
                    creationObject.appId = parseInt(creationObject.appId);

                if (creationObject.tags)
                    creationObject.tags = JSON.parse(creationObject.tags);

                if (creationObject.steps) {
                    creationObject.steps = JSON.parse(creationObject.steps);

                    let files = req.files;
                    if (files)
                        for (let i = 0; i < files.length; i++)
                            creationObject.steps[i].imgURL = files[i].secureURL
                }

                return res.json(tutorialController.register(creationObject));

            } catch (err) {
                return res.json({
                    resp: false,
                    status: 400,
                    msg: 'Erro no formato da mensagem, alguns parametros nao puderam ser parseados',
                    data: {}
                });
            }
        }
    );

    router.route('/approve/:id').patch(
        adminAuth(),
        (req, res) => {
            return res.json(tutorialController.approve(req.body.id));
        }
    );

    router.route('/search/:string').get(
        (req, res) => {
            return res.json(tutorialController.search(req.params.string));
        }
    );

    return router;
}

