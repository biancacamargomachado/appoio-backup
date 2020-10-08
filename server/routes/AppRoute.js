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

router.patch('/installed',
    authHandler.userAuth,
    async (req, res, _) => {
        let appIds = req.body.appIds;
        return res.json(await appController.update(appIds));
    }
);


module.exports = router;