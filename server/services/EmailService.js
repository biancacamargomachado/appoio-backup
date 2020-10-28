const nodemailer = require('nodemailer');
const userRepository = require('../repository/UserRepo');
const stream = require('stream');
const excel = require('exceljs');

async function enviarEmail(email) {
    try {

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
                text: 'Segue em anexo o arquivo pcom os dados dos usuários .',
                attachments: [{
                    filename: 'appoio_user_data.xlsx',
                    content: fileGenerator.data,
                }]
            };

            transporter.sendMail(mailOptions, function(error, _){
                if (error) {
                    console.log(error);
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
            let workbook = new excel.stream.xlsx.WorkbookWriter(
                { 
                    useStyles: true
                }
            );
            
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
                    pattern: 'solid',
                    fgColor: {
                        argb: "DCDCDC"
                    },
                    bgColor: {
                        argb: "FF000000"
                    }
                }
            })
            
            worksheet.columns.forEach(column => {
                column.border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                };
            })
            
            result.data.forEach((row) => {
                worksheet.addRow(row).commit();
            })

            worksheet.commit();
            await workbook.commit();

            return { result: true, status: 201, data: workbook.stream }
        }

        return result;

    } catch (err) {
        console.log(err);
        return { result: false, status: 500, msg: 'Erro durante a geração do arquivo xlsx' };
    }
}

module.exports = { enviarEmail, exportData };