const Sequelize = require('sequelize');
const config = require('../config/env');

// Cria instancia da conexão
const sequelize = new Sequelize(
  config.dataConfig.database,
  config.dataConfig.username,
  config.dataConfig.password,
  {
    host: 'db-appoio.cpr4q5lamt9g.sa-east-1.rds.amazonaws.com',
    port: 3306,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'mysql',
    dialectOptions: {
      ssl: 'Amazon RDS',
    },
    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: 'en',
  }
);

// Realiza a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch((err) => console.log('Error', err));

module.exports = sequelize;
