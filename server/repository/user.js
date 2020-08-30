const config = require("../config/env");
const user = require("../model/user");
const Sequelize = require("sequelize");

let obj = config.dataConfig;

// Development
const sequelize = new Sequelize({
    dialect: obj.dialect,
    storage: obj.storage,
});

//Validando a conexão com o banco de dados
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


async function login(email) {
    return await user.user(sequelize, Sequelize).findOne({
        where: {
            email: email
        }
    });
}

async function register(name, email, password) {
    return await user.user(sequelize, Sequelize).create({
        name: name,
        email: email,
        password: password,
    });
}

//Aqui estamos exportando todos os métodos que criamos para que consigamos acessar eles de outros arquivos
module.exports = { login, register };
