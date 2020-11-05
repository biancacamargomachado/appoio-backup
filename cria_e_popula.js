const Sequelize = require('sequelize');
const { hashSync } = require('bcrypt');

const config = require('./server/config/env');
const User = require('./server/models/User');
const Tutorial = require('./server/models/Tutorial');
const Step = require('./server/models/Step');
const Tag = require('./server/models/Tag');
const App = require('./server/models/App');


async function criaBanco() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        dialectOptions: {
            useUTC: false
        },
        storage: './database.sqlite3'
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
            name: 'admin',
            email: config.admEmail,
            password: hashSync(config.admPwd, 8),
            gender: 'Masculino',
            birthYear: 0,
            city: 'Porto Alegre',
            uf: 'RS',
        });

        await User.create({
            name: 'usuario',
            email: 'usuario@gmail.com',
            password: hashSync('pwd', 8),
            gender: 'Masculino',
            birthYear: 2001,
            city: 'Porto Alegre',
            uf: 'RS',
        });

    } catch (err) {
        console.log('\nCria usuarios:\n', err, '\n');
    }
}


async function criaTutoriais() {
    try {

        await Tutorial.create({
            userId: 1,
            appoioName: 'tutorial conceitos aprovado',
            category: 'Conceitos',
            approved: 1,
            steps: [{ description: 'passo teste 1' }, { description: 'passo teste 1' }]
        }, {
            include: [
                {
                    model: Step,
                    as: 'steps'
                },
            ]
        });

        await Tutorial.create({
            userId: 2,
            appoioName: 'tutorial conceitos nao aprovado',
            category: 'Conceitos',
            approved: 0,
            steps: [{ description: 'passo teste 1' }, { description: 'passo teste 1' }]
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
            appoioName: 'tutorial celular aprovado',
            category: 'Celular',
            approved: 1,
            steps: [{ description: 'passo teste 1' }, { description: 'passo teste 2' }]
        }, {
            include: [
                {
                    model: Step,
                    as: 'steps'
                },
            ]
        });

        await Tutorial.create({
            userId: 2,
            appoioName: 'tutorial celular nao aprovado',
            category: 'Celular',
            approved: 0,
            steps: [{ description: 'passo teste 1' }, { description: 'passo teste 2' }]
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
            appoioName: 'tutorial aplicativos aprovado',
            category: 'Aplicativos',
            approved: 1,
            steps: [{ description: 'Abrir whats' }, { description: 'Clicar on botao' }]
        }, {
            include: [
                {
                    model: Step,
                    as: 'steps'
                },
            ]
        });

        await Tutorial.create({
            userId: 2,
            appoioName: 'tutorial aplicativos nao aprovado',
            category: 'Aplicativos',
            approved: 0,
            steps: [{ description: 'Abrir instagram' }, { description: 'Clicar no botao' }]
        }, {
            include: [
                {
                    model: Step,
                    as: 'steps'
                },
            ]
        });

    } catch (err) {
        console.log('\nCria tutoriais:\n', err, '\n');
    }
}


async function criaTags() {
    try {
        await Tag.create({
            name: '#appoio'
        });

        await Tag.create({
            name: '#AGES'
        });

    } catch (err) {
        console.log('\nCria tags:\n', err, '\n');
    }
}


async function criaApps() {
    try {
        await App.create({
            name: 'WhatsApp',
        });

        await App.create({
            name: 'Instagram',
        });

        await App.create({
            name: 'Facebook',
        });

        await App.create({
            name: 'Ifood',
        });

        await App.create({
            name: 'Google',
        });

        await App.create({
            name: 'Chrome',
        });

        await App.create({
            name: 'Youtube',
        });

        await App.create({
            name: 'Gmail',
        });

        await App.create({
            name: 'Uber',
        });
    } catch (err) {
        console.log('\nCria apps:\n', err, '\n');
    }
}


async function associaTutoriaisTags() {
    try {
        tutorial = await Tutorial.findOne({
            where: {
                id: 1
            }
        });
        await tutorial.setTags((await Tag.findAll()));

        tutorial = await Tutorial.findOne({
            where: {
                id: 2
            }
        });
        await tutorial.setTags((await Tag.findAll()));

        tutorial = await Tutorial.findOne({
            where: {
                id: 3
            }
        });
        await tutorial.setTags((await Tag.findAll()));

        tutorial = await Tutorial.findOne({
            where: {
                id: 4
            }
        });
        await tutorial.setTags((await Tag.findAll()));

        tutorial = await Tutorial.findOne({
            where: {
                id: 5
            }
        });
        await tutorial.setTags((await Tag.findAll()));

        tutorial = await Tutorial.findOne({
            where: {
                id: 6
            }
        });
        await tutorial.setTags((await Tag.findAll()));

    } catch (err) {
        console.log('\nAssocia tutoriais tags:\n', err, '\n');
    }
}


async function associaAppsUsuarios() {
    try {
        let user = await User.findOne({
            where: {
                id: 2
            }
        });
        await user.setApps((await App.findAll()));

    } catch (err) {
        console.log('\nAssocia apps usuarios:\n', err, '\n');
    }
}

async function associaAppsTutoriais() {
    try {
        let app = await App.findOne({
            where: {
                id: 1
            }
        });
        await app.setTutorials((await Tutorial.findAll({ where: { id: 5 } })));

        app = await App.findOne({
            where: {
                id: 2
            }
        });
        await app.setTutorials((await Tutorial.findAll({ where: { id: 6 } })));

    } catch (err) {
        console.log('\nAssocia apps tutoriais:\n', err, '\n');
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
