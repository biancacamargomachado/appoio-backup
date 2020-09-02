const express = require('express');
const sanityCheck = require('./sanityCheck');
const userRoute = require('./UserRoute');

const router = express.Router();

router.use('/check', sanityCheck);
router.use('/user', userRoute);


module.exports = router;