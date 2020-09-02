const Sequelize = require("sequelize");
const config = require("../config/env");

// Cria instancia da conexão
const sequelize;
if (config.env == 'dev')
    sequelize = new Sequelize({
        dialect: config.dataConfig.dialect,
        storage: config.dataConfig.storage,
    });
else
    sequelize = new Sequelize(config.database, config.username, config.password, config.dataConfig);

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