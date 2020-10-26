const express = require('express');
const EmailController = require('../controllers/EmailController');


const router = express.Router();


router.post('/',async (req, res, _) => {
        let { email, titulo, mensagem } = req.body;
        let resp = await EmailController.enviarEmail(email, titulo, mensagem);

        return res.json(resp);
    }
);

module.exports = router;