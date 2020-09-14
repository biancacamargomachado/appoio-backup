const Sequelize = require('sequelize');
const config = require('../config/env');

const User = require('../models/User');
const Tag = require('../models/Tag');
const Tutorial = require('../models/Tutorial');
const App = require('../models/App');
const UserApp = require('../models/UserApp');

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
Tutorial.init(sequelize);
App.init(sequelize);
UserApp.init(sequelize);

//Sincroniza todos os modelos ao mesmo tempo
sequelize.sync();

module.exports = sequelize;
