const express = require('express');
const multer = require('multer');
const tutorialController = require('../controllers/TutorialController');
const storage = require('../helper/ImageHandler');
const authHandler = require('../helper/AuthHandler');


const router = express.Router();

const upload = multer({ storage: storage }).array('images');

router.get('/get/:id',
    async (req, res, _) => {
        return res.json(await tutorialController.get(req.params.id));
    }
);

router.get('/categories',
    authHandler.adminAuth({
        'approved': 0
    }),
    async (req, res, _) => {
        return res.json(await tutorialController.getAll(req.body.approved));
    }
);

router.post('/registration',
    upload,
    authHandler.userAuth,
    async (req, res, _) => {
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

            creationObject.admin = req.session.admin;

            return res.json(await tutorialController.register(creationObject));

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

router.patch('/approve/:id',
    authHandler.adminAuth(),
    async (req, res, _) => {
        return res.json(await tutorialController.approve(req.params.id));
    }
);

router.get('/search/:string',
    async (req, res, _) => {
        return res.json(await tutorialController.search(req.params.string));
    }
);

module.exports = router;


