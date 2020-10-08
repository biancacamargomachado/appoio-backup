const Sequelize = require('sequelize');

const User = require('../server/models/User');
const Tutorial = require('../server/models/Tutorial');
const Step = require('../server/models/Step');
const Tag = require('../server/models/Tag');
const App = require('../server/models/App');


async function criaBanco() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectOptions: {
      useUTC: false
    },
    storage: '../database.sqlite3'
  });

  // Realiza a conexão com o banco
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.log(err);
  }

  await sequelize.drop();

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
  Step.belongsTo(Tutorial, { foreignKey: { name: 'tutorialId', allowNull: false }, as: 'tutorial' });
  Tutorial.hasMany(Step, { as: 'steps' });

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

  // Registra no banco efetivamente
  await sequelize.sync();
}


async function criaUsuarios() {
  try {
    await User.create({
      name: 'usuario',
      email: 'usuario@gmail.com',
      password: 'pwd',
      gender: 'Masculino',
      birthYear: 2001,
      city: 'Porto Alegre',
      uf: 'RS',
    });

    await User.create({
      name: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
      gender: 'Masculino',
      birthYear: 0,
      city: 'Porto Alegre',
      uf: 'RS',
    });

  } catch (err) {
    console.log('\nCria usuarios:\n', err);
  }
}


async function criaTutoriais() {
  try {
    await Tutorial.create({
      userId: 1,
      appoioName: 'tutorial 1',
      category: 'Conceitos',
      approved: 0,
      steps: [{ description: 'passo 1' }, { description: 'passo 1' }]
    }, {
      include: [
        {
          model: Step,
          as: 'steps'
        },
      ]
    });

    await Tutorial.create({
      userId: 1,
      appoioName: 'tutorial 2',
      category: 'Celular',
      approved: 0,
      steps: [{ description: 'passo 1' }, { description: 'passo 1' }]
    }, {
      include: [
        {
          model: Step,
          as: 'steps'
        },
      ]
    });

    await Tutorial.create({
      userId: 1,
      appoioName: 'tutorial 1',
      category: 'Aplicativos',
      approved: 0,
      steps: [{ description: 'passo 1' }, { description: 'passo 1' }]
    }, {
      include: [
        {
          model: Step,
          as: 'steps'
        },
      ]
    });

    await Tutorial.create({
      userId: 1,
      appoioName: 'tutorial 2',
      category: 'Celular',
      approved: 0,
      steps: [{ description: 'passo 1' }, { description: 'passo 1' }]
    }, {
      include: [
        {
          model: Step,
          as: 'steps'
        },
      ]
    });
  } catch (err) {
    console.log('\nCria tutoriais:\n', err);
  }
}


async function criaTags() {
  try {
    await Tag.create({
      name: 'tag 1'
    });

    await Tag.create({
      name: 'tag 2'
    });

    await Tag.create({
      name: 'tag 3'
    });

    await Tag.create({
      name: 'tag 4'
    });

  } catch (err) {
    console.log('\nCria tags:\n', err);
  }
}


async function criaApps() {
  try {
    await App.create({
      name: 'aplicativo 1',
      logoURL: 'http://aplicativo-1'
    });

    await App.create({
      name: 'aplicativo 2',
      logoURL: 'http://aplicativo-2'
    });

    await App.create({
      name: 'aplicativo 3',
      logoURL: 'http://aplicativo-3'
    });

    await App.create({
      name: 'aplicativo 4',
      logoURL: 'http://aplicativo-4'
    });

    await App.create({
      name: 'aplicativo 5',
      logoURL: 'http://aplicativo-5'
    });

    await App.create({
      name: 'aplicativo 6',
      logoURL: 'http://aplicativo-6'
    });
  } catch (err) {
    console.log('\nCria apps:\n', err);
  }
}


async function associaTutoriaisTags() {
  try {
    let tutorialUm = await Tutorial.findOne({
      where: {
        id: 1
      }
    });
    await tutorialUm.setTags((await Tag.findAll({ where: { id: [1, 2] } })));


    let tutorialDois = await Tutorial.findOne({
      where: {
        id: 2
      }
    });
    await tutorialDois.setTags((await Tag.findAll({ where: { id: [3, 4] } })));

    let tutorialTres = await Tutorial.findOne({
      where: {
        id: 3
      }
    });
    await tutorialTres.setTags((await Tag.findAll({ where: { id: [1, 2] } })));

    let tutorialQuatro = await Tutorial.findOne({
      where: {
        id: 4
      }
    });
    await tutorialQuatro.setTags((await Tag.findAll({ where: { id: [3, 4] } })));

  } catch (err) {
    console.log('\nAssocia tutoriais tags:\n', err);
  }
}


async function associaAppsUsuarios() {
  try {
    let userUm = await User.findOne({
      where: {
        id: 1
      }
    });
    await userUm.setApps((await App.findAll({ where: { id: [1, 3, 5] } })));

    let userDois = await User.findOne({
      where: {
        id: 2
      }
    });
    await userDois.setApps((await App.findAll()));
  } catch (err) {
    console.log('\nAssocia apps usuarios:\n', err);
  }
}

async function associaAppsTutoriais() {
  try {
    let appUm = await App.findOne({
      where: {
        id: 1
      }
    });

    let appDois = await App.findOne({
      where: {
        id: 2
      }
    });

    let appTres = await App.findOne({
      where: {
        id: 3
      }
    });

    let appCinco = await App.findOne({
      where: {
        id: 5
      }
    });

    let tutorials = await Tutorial.findAll();

    await appUm.setTutorials(tutorials.slice(0, 2));
    await appDois.setTutorials(tutorials[2]);
    await appTres.setTutorials(tutorials[3]);
    await appCinco.setTutorials(tutorials[4]);
  } catch (err) {
    console.log('\nAssocia apps tutoriais:\n', err);
  }

}


(async () => {
  await criaBanco();
  await criaUsuarios();
  await criaTutoriais();
  await criaTags();
  await criaApps();
  await associaTutoriaisTags();
  await associaAppsUsuarios();
  await associaAppsTutoriais();
})().then();
