const config = require('../config/env');
const nodemailer = require('nodemailer');


module.exports = {
    sendEmail: async ({ email, subject, text, attachments }) => {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.admEmail,
                    pass: config.admPwd
                }
            });

            var mailOptions = {
                from: config.admEmail,
                to: email,
                subject: subject,
                html: text,
                attachments: attachments
            };

            transporter.sendMail(mailOptions, function (error, _) {
                if (error) {
                    console.log(error);
                }
            });

            return { result: true };

        } catch (err) {
            console.log(err);
            return { result: false, status: 500, msg: 'Erro ao enviar email' };
        }
    }
}