const User = require('../models/User');
const { UniqueConstraintError, ForeignKeyConstraintError, TimeoutError, ValidationError } = require('sequelize');

/*
 * Função que busca a senha e id de um usuário dado o email
 * 
 * @example
 *     findByEmail(meuemail@gmail.com); // User(id, password)
 * 
 * @param {email}  obrigatório email do usuário cujos dados se deseja buscar
 * 
 * @returns {User}
 * 
 */
async function findByEmail(email) {
    try {
        return {
            result: true,
            data: await User.findOne({
                attributes: [
                    'id',
                    'password'
                ],
                where: {
                    email: email
                }
            })
        };

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: 'E-mail do usuário já existe no banco' };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
        else if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
    }
}


/*
 * Função que cria um registro de um novo usuário a partir dos dados informados
 * 
 * @param {name} obrigatório o nome do usuário a ser criado
 * @param {email} obrigatório o email do usuário a ser criado
 * @param {password} obrigatório a senha do usuário a ser criado
 * @param {gender} obrigatório gênero do usuário
 * @param {birthYear} obrigtório o ano de nascimento do usuário a ser criado
 * @param {city} obrigatório a cidade do usuário a ser criado
 * @param {uf} obrigatório a unidade federativa do usuário a ser criado
 * 
 * @returns {User}
 * 
 */
async function registerUser(name, email, password, gender, birthYear, city, uf) {
    try {

        return {
            result: true,
            data: await User.create({
                name,
                email,
                password,
                gender,
                birthYear,
                city,
                uf,
            })
        };

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: 'E-mail do usuário já existe no banco' };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
        else if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
    }
}

async function findAll(){
    try{
        return {
            result: true,
            data: await User.findAll({
                attributes: [
                    'name',
                    'email',
                    'gender',
                    'birthYear',
                    'city',
                    'uf'
                ]
            })
        }

    } catch (err) {
        if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
        else if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
    }
}


module.exports = { findByEmail, registerUser, findAll };
