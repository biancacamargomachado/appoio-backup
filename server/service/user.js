const userInstance = require("../repository/user");


// Função assincrona que realiza o login e retorna um dicionario de resposta
// Valida usuário encontrado
// Valida senha
async function login(params) {
    var user = await userInstance.login(params.email);

    if (!user)
        return {
            resp: false,
            code: 404,
            msg: "Erro: usuário não encontrado",
            data: {},
        }

    else if (user.validPassword(params.pwd))
        return {
            resp: false,
            code: 403,
            msg: "Erro: senha incorreta",
            data: {},
        }

    return {
        resp: true,
        code: 200,
        msg: "Usuário logado",
        data: {},
    }
}

// Função assincrona que registra um usuário e retorna um dicionario de resposta
// Valida usuário já cadastrado
async function register(params) {
    var user = await userInstance.register(params.name, params.email, params.pwd);

    if (!user)
        return {
            resp: false,
            code: 401,
            msg: "Erro: e-mail já cadastrado",
            data: {},
        }

    return {
        resp: true,
        code: 201,
        msg: "Uusário registrado",
        data: {},
    }
}

module.exports = { login, register };