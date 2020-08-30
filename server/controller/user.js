const user = require('../service/user');


//Método que retorna apenas um usuário de acordo com o login informado
async function login(req, res) {
    res.setHeader("Content-Type", "application/json");

    return await user
        .login(req.body)
        .catch(err => {
            console.log(err);
            res.status(err.statusCode || 404).send(err);
        })
        .then(q => {
            return res.status(200).send(JSON.stringify(q));
        });
}

//Método que retorna registra um novo usuário de acordo com o email e senha informados
async function register(req, res) {
    res.setHeader("Content-Type", "application/json");

    return await user
        .register(req.body)
        .catch(err => {
            console.log(err);
            res.status(err.statusCode || 401).send(err);
        })
        .then(q => {
            return res.status(200).send(JSON.stringify(q));
        });
}

module.exports = { login, register };