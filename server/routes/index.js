const express = require('express');
const sanityCheck = require('./sanityCheck');
const userRoute = require('./UserRoute');
const tagRoute = require('./TagRoute');
const tutorialRoute = require('./TutorialRoute');

const router = express.Router();

router.use('/check', sanityCheck);
router.use('/user', userRoute);
router.use('/tag', tagRoute);
router.use('/tutorial', tutorialRoute);


module.exports = router;