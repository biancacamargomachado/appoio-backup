const express = require("express");
const sanityCheck = require("./sanityCheck");
const user = require("./user");

const router = express.Router();

router.use('/check', sanityCheck);
router.use('/user', user);


module.exports = router;