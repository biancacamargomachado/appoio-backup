const express = require('express');

const router = express.Router();

router.route("/").get((_, res) => {
    res.json({
        status: "Check"
    })
})

module.exports = router;