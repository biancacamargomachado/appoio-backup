const express = require('express');
const userRoute = require('./UserRoute');
const tutorialRoute = require('./TutorialRoute');
const appRoute = require('./AppRoute');

const router = express.Router();


router.use('/user', userRoute);
router.use('/app', appRoute);
router.use('/tutorial', tutorialRoute);


module.exports = router;
