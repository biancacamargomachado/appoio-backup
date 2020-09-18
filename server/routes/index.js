const express = require('express');
const userRoute = require('./UserRoute');
const tutorialRoute = require('./TutorialRoute');

const router = express.Router();

router.use('/user', userRoute);
router.use('/tutorial', tutorialRoute);


module.exports = router;
