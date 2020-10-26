const nodemailer = require('nodemailer');

async function enviarEmail(email) {
    try {

        var usuario = 'contaagesappoio@gmail.com';
        var senha = ''; 
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: usuario,
                pass: senha
            }
        });

        var destinatario = email;

        var mailOptions = {
            from: usuario,
            to: destinatario,
            subject: 'Lista de usuários Appoio',
            text: 'Segue em anexo o arquivo para visualizar os usuários!',
            attachments: [{
                filename: 'userData.xlsx',
                path: 'dados_exportados/userData.xlsx'
              }]
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

        return { result: true, status: 200, msg: 'Email enviado com sucesso' };

    } catch (err) {
        console.log(err);
        return { result: false, status: 500, msg: 'Erro ao enviar email' };
    }
}

module.exports = { enviarEmail };