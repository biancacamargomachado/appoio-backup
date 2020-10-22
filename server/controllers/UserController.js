const userService = require('../services/UserService');


async function login(email, password) {
    try {
        let result = await userService.login(email, password);

        if (result.result)
            return {
                result: true,
                status: 200,
                msg: 'Usuário realizou login',
                data: result.data
            };

        return {
            result: false,
            status: result.status,
            msg: result.msg,
            data: {}
        };

    } catch (err) {
        console.log(err);

        return {
            result: false,
            status: 500,
            msg: 'Erro desconhecido durante o login do usuário',
            data: {}
        };
    }
}


async function register(name, email, password, gender, birthYear, city, uf) {
    try {
        let result = await userService.registerUser(
            name,
            email,
            password,
            gender,
            birthYear,
            city,
            uf,
        );

        if (result.result)
            return {
                result: true,
                status: 201,
                msg: 'Usuário registrado',
                data: result.data
            };

        return {
            result: false,
            status: result.status,
            msg: result.msg,
            data: {}
        };

    } catch (err) {
        console.log(err);

        return {
            result: false,
            status: 500,
            msg: 'Erro desconhecido durante o registro do usuário',
            data: {}
        };
    }
}

async function exportData(){
    try {
        let result = await userService.exportData();

        if (result.result)
            return {
                result: true,
                status: 201,
                msg: 'Arquivo xlsx gerado',
                data: {}
            };

        return {
            result: false,
            status: result.status,
            msg: result.msg,
            data: {}
        };
    } catch (err) {
        console.log(err);

        return {
            result: false,
            status: 500,
            msg: 'Erro desconhecido durante geração do arquivo xlsx',
            data: {}
        };
    }
}

module.exports = { login, register, exportData };
