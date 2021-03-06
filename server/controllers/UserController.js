const userService = require('../services/UserService');
const emailHandler = require('../helper/EmailHandler');


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

async function exportData(email) {
    try {
        let result = await userService.exportData(email);

        if (result.result){
            let emailResult = await emailHandler.sendEmail(result.data);

            if (emailResult){
                return {
                    result: true,
                    status: 200,
                    msg: 'Dados exportados',
                    data: {}
                };
            }

            return {
                result: false,
                status: result.status,
                msg: result.msg,
                data: {}
            };
        }

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
            msg: 'Erro desconhecido durante exportação de dados',
            data: {}
        };
    }
}

module.exports = { login, register, exportData };
