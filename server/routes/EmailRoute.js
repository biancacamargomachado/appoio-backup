const express = require('express');
const emailController = require('../controllers/EmailController');
const authHandler = require('../helper/AuthHandler');

const router = express.Router();


router.post('/',
    authHandler.adminAuth(),
    async (req, res, _) => {
        let { email } = req.body;
        return res.json(await emailController.enviarEmail(email));
    }
);

module.exports = router;