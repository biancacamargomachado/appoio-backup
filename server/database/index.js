const Sequelize = require('sequelize');
const config = require('../config/env');

const User = require('../models/User');
const Tutorial = require('../models/Tutorial');
const Step = require('../models/Step');
const Tag = require('../models/Tag');
const App = require('../models/App');

// Cria instancia da conexão
const sequelize = new Sequelize(config.database, config.username, config.password, config.dataConfig);

// Realiza a conexão com o banco
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Inicializa todas as tabelas
User.init(sequelize);
Tutorial.init(sequelize);
Step.init(sequelize);
Tag.init(sequelize);
App.init(sequelize);

// Many to Many entre User e App utilizando tabela intermediária "USER_APP"
const UserApp = sequelize.define('user_app', {}, { timestamps: false });
User.belongsToMany(App, {
  through: UserApp,
  as: 'apps'
});
App.belongsToMany(User, {
  through: UserApp,
  as: 'users'
});

// One to Many entre User e Tutorial
Tutorial.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, as: 'user' });
User.hasMany(Tutorial, { as: 'tutorials' });

// One to Many entre App e Tutorial
Tutorial.belongsTo(App, { foreignKey: { name: 'userId', allowNull: true }, as: 'app' });
App.hasMany(Tutorial, { as: 'tutorials' });

// One to Many entre Tutorial e Step
Step.belongsTo(Tutorial, { foreignKey: { name: 'tutorialId', allowNull: false }, as: 'tutorial', hooks: true});
Tutorial.hasMany(Step, { as: 'steps', onDelete: 'cascade', hooks: true });

// Many to Many entre Tutorial e Tag utilizando tabela intermediária "TUTORIAL_TAG"
const TutorialTag = sequelize.define('tutorial_tag', {}, { timestamps: false });
Tutorial.belongsToMany(Tag, {
  through: TutorialTag,
  as: 'tags'
});
Tag.belongsToMany(Tutorial, {
  through: TutorialTag,
  as: 'tutorials'
});

// Registra o banco efetivamente
sequelize.sync();

module.exports = sequelize;
