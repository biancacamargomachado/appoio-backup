const express = require('express');
const appController = require('../controllers/AppController.js');
const authHandler = require('../helper/AuthHandler');


const router = express.Router();

router.get('/all',
    async (req, res, _) => {
        let userId = req.session.userId;
        return res.json(await appController.getAll(userId));
    }
);

router.get('/tutorials',
    async (req, res, _) => {
        let appId = req.body.appId;
        return res.json(await appController.getTutorials(appId));
    }
);

router.get('/installed',
    authHandler.userAuth,
    async (req, res, _) => {
        let userId = req.session.userId;
        return res.json(await appController.getInstalled(userId));
    }
);

router.patch('/installed',
    authHandler.userAuth,
    async (req, res, _) => {
        let userId = req.session.userId;
        let appIds = req.body.appIds;
        return res.json(await appController.update(userId, appIds));
    }
);


module.exports = router;