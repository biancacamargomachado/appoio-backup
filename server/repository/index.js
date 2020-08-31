const Sequelize = require("sequelize");
const config = require("../config/env");

// Configurações de ambiente
let obj = config.dataConfig;

// Cria instancia da conexão
const sequelize = new Sequelize({
    dialect: obj.dialect,
    storage: obj.storage,
});

// Realiza a conexão com o banco de dados
sequelize
    .authenticate()
    .then(
        () => console.log("Connection has been established successfully")
    )
    .catch(
        (err) => console.log("Error", err)
    );


module.exports = sequelize;