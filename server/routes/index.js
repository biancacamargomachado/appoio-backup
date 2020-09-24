const express = require('express');
const userRoute = require('./UserRoute');
const tutorialRoute = require('./TutorialRoute');
const appRoute = require('./AppRoute');

const router = express.Router();

router.use('/user', userRoute);
router.use('/tutorial', tutorialRoute);
router.use('/app', appRoute);


module.exports = router;
