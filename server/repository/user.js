const Sequelize = require("sequelize");
const sequelizeInstance = require("./index");
const user = require("../model/user");


async function login(email) {
    var result = await user.user(sequelizeInstance, Sequelize).findOne({
        where: {
            email: email
        }
    });

    return result;
}

async function register(name, email, password) {
    return await user.user(sequelizeInstance, Sequelize).create({
        name: name,
        email: email,
        password: password,
    });
}

//Aqui estamos exportando todos os métodos que criamos para que consigamos acessar eles de outros arquivos
module.exports = { login, register };
