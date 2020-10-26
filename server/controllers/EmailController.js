const emailService = require('../services/EmailService');

async function enviarEmail(email, titulo, mensagem) {
    //chamar função de gerar arquido em excel
    try {
        let result = await emailService.enviarEmail(email, titulo, mensagem);

        if (result.result)
            return {
                result: true,
                status: 200,
                msg: 'Email enviado com sucesso',
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


module.exports = { enviarEmail };