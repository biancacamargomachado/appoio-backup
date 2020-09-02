const Sequelize = require('sequelize');
const config = require('../config/database');

const User = require('../models/User');

// Cria instancia da conexão
const sequelize = new Sequelize(config);

User.init(sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
