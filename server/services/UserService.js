const userRepository = require('../repository/UserRepo');
const { compare, hash } = require('bcrypt');
const admEmail = require('../config/env').admEmail;
const excel = require('exceljs');
const fs = require('fs');

/*
 * Função que realiza o login do usuário dado seu email e senha, buscando o usuário e 
 * registrando seu id na sessão, caso os dados sejam válidos.
 * 
 * @param {email}  obrigatório o email do usuário cadastrado
 * @param {password}  obrigatória a senha do usuário cadastrado
 * 
 * @returns {User.id, User.adm}
 * 
 */
async function login(email, password) {
    try {
        let result = await userRepository.findByEmail(email);
        if (result.result) {
            if (result.data) {
                let user = result.data.toJSON();
                let match = await compare(password, user.password);
                if (!match)
                    return { result: false, status: 403, msg: 'E-mail ou senha incorreto' };

                if (email === admEmail)
                    user.admin = true;
                else
                    user.admin = false;

                delete user.password;
                return { result: true, data: user };
            }
            else
                return { result: false, status: 401, msg: 'E-mail ou senha incorreto' };
        }

        return result;

    } catch (err) {
        return { result: false, status: 500, msg: 'Erro ao validar identidade do usuário' };
    }
}


/*
 * Função que registra um novo usuário a partir dos dados informados, após criptografar a senha
 * 
 * @param {name} obrigatório o nome do usuário a ser criado
 * @param {email} obrigatório o email do usuário a ser criado
 * @param {password} obrigatório a senha do usuário a ser criado
 * @param {gender} obrigatório o gênero do usuário
 * @param {birthYear} obrigtório o ano de nascimento do usuário a ser criado
 * @param {city} obrigatório a cidade do usuário a ser criado
 * @param {uf} obrigatório a unidade federativa do usuário a ser criado
 * 
 * @returns {User}
 * 
 */
async function registerUser(name, email, password, gender, birthYear, city, uf) {
    try {

        let hashedPassword = await hash(password, 8);

        let result = await userRepository.registerUser(
            name,
            email,
            hashedPassword,
            gender,
            birthYear,
            city,
            uf,
        );

        if (result.result) {
            if (result.data) {
                let user = result.data.toJSON();

                user.admin = false;

                delete user.password;
                delete user.name;
                delete user.email;
                delete user.gender;
                delete user.birthYear;
                delete user.city;
                delete user.uf;

                return { result: true, data: user };
            }
            else
                return { result: false, status: 400, msg: 'Não foi possível registrar o usuário' };
        }

        return result;

    } catch (err) {
        return { result: false, status: 500, msg: 'Erro durante a formatação dos dados' };
    }
}

async function exportData(){
    try{
        let result = await userRepository.findAll();
        if(result.result) {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Usuários');
            const filename = 'dados_exportados/userData.xlsx';

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
                    pattern:'lightGray'
                }
            })
            
            worksheet.addRows(result.data);

            worksheet.columns.forEach(column => {
                column.border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                };
            })

            await workbook.xlsx.writeFile(filename);

            return { result: true, data: {} };
        }

        return result;

    } catch (err) {
        console.log(err)
        return { result: false, status: 500, msg: 'Erro durante a geração do arquivo xlsx' };
    }
}


module.exports = { login, registerUser, exportData };
