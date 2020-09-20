const Sequelize = require('sequelize');

const User = require('../server/models/User');
const Tutorial = require('../server/models/Tutorial');
const Step = require('../server/models/Step');
const Tag = require('../server/models/Tag');
const App = require('../server/models/App');

// Cria instancia da conexão
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

async function criaUsuarios(qtdUsuarios) {
  try {
    for (let i = 0; i < qtdUsuarios; i++) {
      await User.create({
        name: "usuario numero " + i,
        email: "email_" + i + "@email.com",
        password: "senha" + i,
        birthday: "10/10/2019",
        city: "cidade",
        uf: "RS",
      });
    }
  } catch (err) {
    console.log("\n\nUsuarios já criados\n\n");
  }
}

async function criaTutoriais(qtdCategorias, qtdTutorialCategoria, qtdPassosTutorial, qtdTagsTutorial) {
  let passos = []
  for (let i = 0; i < qtdPassosTutorial; i++) {
    passos.push({ description: "passo numero: " + i });
  }

  let tags = []
  for (let i = 0; i < qtdTagsTutorial; i++) {
    tags.push({ name: "tag numero: " + i });
  }

  try {
    for (let i = 0; i < qtdCategorias; i++) {
      let categoria = "categoria numero " + i;
      for (let j = 0; i < qtdTutorialCategoria; i++) {
        await Tutorial.create(
          {
            userId: 1,
            appoioName: "tutorial numero " + i + j,
            category: categoria,
            tags: tags,
            steps: passos
          },
          {
            include: [
              {
                model: Step,
                as: 'steps'
              },
              {
                model: Tag,
                as: 'tags'
              }
            ]
          }
        );
      }
    }
  } catch (err) {
    console.log("Tutoriais já criados");
  }
}


async function main(){
  await criaBanco();
  await criaUsuarios(2);
  await criaTutoriais(2, 3, 5, 2);
}


main().then();
