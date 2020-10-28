const nodemailer = require('nodemailer');
const userRepository = require('../repository/UserRepo');
const stream = require('stream');
const excel = require('exceljs');
const fs = require('fs')

async function enviarEmail(email) {
    try {

        let readableStream =  new stream.Readable({
            read(size) {
                return true;
            }
        });

        let fileGenerator = await exportData();

        if(fileGenerator.result){
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
                    filename: 'appoio_user_data.xlsx',
                    //content: fileGenerator.data,
                    streamSource: readableStream.pipe(fileGenerator.data)
                }]
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email enviado: ' + info.response);
                }
            });

            return { result: true, status: 200 };
        }
        return  { result: false, status: 500, msg: 'Erro ao gerar o arquivo xlsx' };

    } catch (err) {
        console.log(err);
        return { result: false, status: 500, msg: 'Erro ao enviar email' };
    }
}

async function exportData(){
    try{
        let result = await userRepository.findAll();
        
        if(result.result) {
            let excelStream = new stream.Writable({
                write: function(chunk, encoding, next) {
                  console.log(chunk.toString());
                  next();
                }
            });

            let workbook = new excel.stream.xlsx.WorkbookWriter({ stream: excelStream });
            let worksheet = workbook.addWorksheet('Usuários');

            worksheet.columns = [ 
                { header: 'Nome', key: 'name', width: 20},
                { header: 'E-mail', key: 'email', width: 20},
                { header: 'Gênero', key: 'gender', width: 15},
                { header: 'Nascimento', key: 'birthYear', width: 15},
                { header: 'Cidade', key: 'city', width: 15},
                { header: 'Estado', key: 'uf', width: 10},
            ];

            worksheet.getRow(1).font =  { bold: true };
            worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getRow(1).eachCell(cell => {
                cell.fill = { 
                    type: 'pattern',
                    pattern: 'lightGray'
                }
            })
            
            result.data.forEach((row) => {
                worksheet.addRow(row).commit();
            })

            worksheet.columns.forEach(column => {
                column.border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                };
            })

            worksheet.commit();
            await workbook.commit();

           // await workbook.xlsx.write(excelStream);
           // excelStream.write(workbook);

            return { result: true, status: 201, data: excelStream }
        }

        return result;

    } catch (err) {
        console.log(err)
        return { result: false, status: 500, msg: 'Erro durante a geração do arquivo xlsx' };
    }
}

module.exports = { enviarEmail, exportData };