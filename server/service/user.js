const user = require('../repository/user');


async function login(params) {
    var usr = await user.login(params.email);
    
    if (!usr)
        return {
            resp: false,
            code: 404,
            msg: 'Erro: usuario não encontrado',
            data: {},
        };


    else if (usr.validPassword(params.pwd))
        return {
            resp: false,
            code: 403,
            msg: 'Erro: Senha incorreta',
            data: {},
        };

    return {
        resp: true,
        code: 200,
        msg: "User logged",
        data: {},
    }
}

async function register(params) {
    var usr = await user.register(params.name, params.email, params.pwd);

    if (!usr)
        return {
            resp: false,
            code: 401,
            msg: 'Erro: E-mail já cadastrado',
            data: {},
        };

    return {
        resp: true,
        code: 201,
        msg: "User registered",
        data: {},
    }
}

module.exports = { login, register };