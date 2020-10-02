const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();


module.exports = function () {
    router.route('/login').post(
        (req, res) => {
            let { email, password } = req.body;
            let resp = userController.login(email, password);
            if (resp.result)
                req.session.userId = resp.data.id;

            return res.json(resp);
        }
    );

    router.route('/registration').post(
        (req, res) => {
            let { name, email, password, gender, birthYear, city, uf } = req.body;
            let resp = userController.register(name, email, password, gender, birthYear, city, uf);
            if (resp.result)
                req.session.userId = resp.data.id;

            return res.json(resp);
        }
    );


    return router;
}