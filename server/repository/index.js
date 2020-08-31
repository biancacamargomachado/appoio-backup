const Sequelize = require("sequelize");
const config = require("../config/env");

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


module.exports = sequelize;