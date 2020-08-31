const express = require("express");
const userInstance = require("../controller/user");

const router = express.Router();

// Rota para logar um usuário
router.route("/login").post(userInstance.login);

// Rota para cadastrar um usuário
router.route("/registration").post(userInstance.register);


module.exports = router;