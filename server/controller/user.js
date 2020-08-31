// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const userInstance = require("../service/user");

// Função assincrona que realiza o login e retorna um JSON de resposta
async function login(req, res) {
    return await userInstance
        .login(req.body)
        .catch(err => console.log(err))
        .then(q => res
            .status(200)
            .json(q)
        );
}

// Função assincrona que realiza o regisgtro de um usuário e retorna um JSON de resposta
async function register(req, res) {
    return await userInstance
        .register(req.body)
        .catch(err => console.log(err))
        .then(q => res.status(201)
            .json(q)
        );
}


module.exports = { login, register };