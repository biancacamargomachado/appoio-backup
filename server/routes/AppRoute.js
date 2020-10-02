const express = require('express');
const appController = require('../controllers/AppController.js');


module.exports = function (userAuth) {
    const router = express.Router();

    router.route('/all').get(
        (req, res) => {
            let userId = req.session.userId;
            return res.json(appController.getAll(userId));
        }
    );

    router.route('/tutorials').get(
        (req, res) => {
            let appId = req.body.appId;
            return res.json(appController.getTutorials(appId));
        }
    );

    router.route('/installed').patch(
        userAuth,
        (req, res) => {
            let appIds = req.body.appIds;
            return res.json(appController.update(appIds));
        }
    );


    return router;
}