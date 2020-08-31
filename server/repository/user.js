const Sequelize = require("sequelize");
const sequelizeInstance = require("./index");
const userInstance = require("../model/user");

// Recupera do banco de dados um usuário que possua e-mail igual ao informado e retorna o objeto recuperado
async function login(informedEmail) {
    return await userInstance.user(sequelizeInstance, Sequelize).findOne({
        where: {
            email: informedEmail,
        }
    });
}

// Registra no banco de dados um usuário com nome, email e senha informados e retorna o objeto criado
async function register(informedName, informedEmail, informedPassword) {
    return await userInstance.user(sequelizeInstance, Sequelize).create({
        name: informedName,
        email: informedEmail,
        password: informedPassword,
    });
}

module.exports = { login, register };