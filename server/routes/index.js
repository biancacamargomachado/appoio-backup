const express = require('express');
const sanityCheck = require('./sanityCheck');
const userRoute = require('./UserRoute');
const tutorialRoute = require('./TutorialRoute');

const router = express.Router();

router.use('/check', sanityCheck);
router.use('/user', userRoute);
router.use('/tutorial', tutorialRoute);


module.exports = router;