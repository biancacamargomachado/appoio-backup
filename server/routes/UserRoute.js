const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();


router.post('/login',
    async (req, res, _) => {
        let { email, password } = req.body;
        let resp = await userController.login(email, password);
        if (resp.result) {
            req.session.userId = resp.data.id;
            req.session.admin = resp.data.admin;
        }

        return res.json(resp);
    }
);

router.post('/registration',
    async (req, res, _) => {
        let { name, email, password, gender, birthYear, city, uf } = req.body;
        let resp = await userController.register(name, email, password, gender, birthYear, city, uf);
        if (resp.result) {
            req.session.userId = resp.data.id;
            req.session.admin = resp.data.admin;
        }

        return res.json(resp);
    }
);

module.exports = router;
