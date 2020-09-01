const Sequelize = require('sequelize');
const config = require('../config/env');

const sequelize = new Sequelize(config.mysql);

// Realiza a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch((err) => console.log('Error', err));

module.exports = sequelize;
