const express = require('express');
const appController = require('../controllers/AppController.js');

const router = express.Router();

router.route('/all').get(appController.getAll);
router.route('/tutorials').get(appController.getTutorials);
router.route('/installed').get(appController.getInstalled);
router.route('/installed').post(appController.register);
router.route('/installed').put(appController.update);


module.exports = router;
