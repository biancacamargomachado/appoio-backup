const Sequelize = require('sequelize');
const config = require('../config/env');

const User = require('../models/User');
const Tag = require('../models/tag');

// Cria instancia da conexão
const sequelize = new Sequelize(config.dataConfig);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


User.init(sequelize);
Tag.init(sequelize);

sequelize.sync();

module.exports = sequelize;
