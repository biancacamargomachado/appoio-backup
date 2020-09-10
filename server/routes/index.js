const express = require('express');
const sanityCheck = require('./sanityCheck');
const userRoute = require('./UserRoute');
const tagRoute = require('./TagRoute');

const router = express.Router();

router.use('/check', sanityCheck);
router.use('/user', userRoute);
router.use('/tag', tagRoute);


module.exports = router;