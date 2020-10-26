const express = require('express');
const userRoute = require('./UserRoute');
const tutorialRoute = require('./TutorialRoute');
const appRoute = require('./AppRoute');
const emailRoute = require('./EmailRoute');

const router = express.Router();


router.use('/user', userRoute);
router.use('/app', appRoute);
router.use('/tutorial', tutorialRoute);
router.use('/enviarEmail', emailRoute);



module.exports = router;
