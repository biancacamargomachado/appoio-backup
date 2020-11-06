const Tutorial = require('../models/Tutorial');
const Step = require('../models/Step');
const Tag = require('../models/Tag');
const User = require('../models/User');
const App = require('../models/App');
const sequelize = require('../database');
const { UniqueConstraintError, ForeignKeyConstraintError, TimeoutError, ValidationError } = require('sequelize');
const { Op } = require('sequelize');

/*
 * Função que busca um tutorial dado seu id
 *
 *  @example
 *      get(1); // Tutorial()
 * 
 * @param {id} obrigatório id do tutorial o qual se deseja buscar
 * 
 * @returns {Tutorial}
 * 
 */
async function findById(id) {
    try {
        return {
            result: true,
            data: await Tutorial.findOne({
                where: {
                    id: id
                },
                attributes: [
                    'appoioName',
                    'category',
                    'appId',
                    'appVersion',
                    'operatingSystem',
                    'operatingSystemVersion',
                    ['createdAt', 'date']
                ],
                include: [{
                    model: Step,
                    as: 'steps',
                    attributes: [
                        'description',
                        'videoURL',
                        'imgURL'
                    ]
                }, {
                    model: Tag,
                    as: 'tags',
                    attributes: [
                        'name'
                    ],
                }, {
                    model: User,
                    as: 'user',
                    attributes: [
                        'name',
                        'email'
                    ]
                }]
            })
        };

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: 'E-mail do usuário já existe no banco' };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
        else if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
    }
}

/*
 * Função que busca todos os tutoriais registrados, retornando o id, appoioName e categoria de cada um.
 * 
 * @returns {Tutorials} em ordem descrescente da data de criação do tutorial
 */
async function findAll(approved) {
    try {
        return {
            result: true,
            data: await Tutorial.findAll({
                where: {
                    approved
                },
                attributes: [
                    'id',
                    'appoioName',
                    'category',
                    'operatingSystem',
                    ['createdAt', 'date']
                ],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: [
                        'name',
                    ]
                }],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        };
    }
    catch (err) {
        if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: 'E-mail do usuário já existe no banco' };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
        else if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
    }
}


async function approve(id) {
    try {
        await Tutorial.update({
            approved: 1
        }, {
            where: {
                id: id
            }
        });

        return { result: true, data: {} };

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: 'E-mail do usuário já existe no banco' };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
        else if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
    }
}


async function registerTutorial(tutorialCreationObject) {
    if (tutorialCreationObject.admin)
        tutorialCreationObject.approved = 1;
    else
        tutorialCreationObject.approved = 0;

    delete tutorialCreationObject.admin;

    let tags = tutorialCreationObject.tags;
    delete tutorialCreationObject.tags;

    const transaction = await sequelize.transaction();
    try {
        let tutorial = await Tutorial.create(
            tutorialCreationObject,
            {
                transaction: transaction,
                include: [
                    {
                        model: Step,
                        as: 'steps'
                    }]
            }
        );

        if (tutorial) {
            let createdTags = [];

            if (tags.length) {    
                for (let tagName of tags) {
                    createdTags.push((await Tag.findOrCreate({ transaction: transaction, where: {name: tagName} }))[0]);
                }

                await tutorial.setTags(createdTags, { transaction: transaction });
            }

            await transaction.commit();

            return {
                result: true,
                data: {
                    tutorial: tutorial,
                    tags: createdTags,
                    user: (await User.findByPk(tutorialCreationObject.userId))
                }
            };
        }
        else {
            await transaction.rollback();

            return { result: false, status: 404, msg: 'Tutorial não encontrado' };
        }


    } catch (err) {
        await transaction.rollback();

        if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: 'E-mail do usuário já existe no banco' };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
        else if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
    }
}

async function deleteTutorial(tutorialId) {
    try {
        let tutorial = await Tutorial.findOne({
            where: {
                id: tutorialId
            },
            include: [{
                model: Step,
                as: 'steps'
            }]
        });
        
        if (tutorial === null)
            return {
                result: false,
                status: 404,
                msg: 'Tutorial não encontrado para remoção'
            };
        

        return {
            result: true,
            data: await tutorial.destroy()
        }

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: 'E-mail do usuário já existe no banco' };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
        else if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
    }
}

async function search(searchString) {
    try {
        let tutorials = await Tutorial.findAll({
            where: {
                appoioName: sequelize.where(sequelize.fn('LOWER', sequelize.col('tutorial.appoioName')), 'LIKE', `%${searchString}%`),
                approved: 1
            },
            attributes: [
                'id',
                'appoioName',
                'category',
                ['createdAt', 'date']
            ],
            include: [{
                model: User,
                as: 'user',
                attributes: [
                    'name',
                ]
            }],
        });

        let tutorialsIds = tutorials.map(tutorial => tutorial.id);

        let tagTutorials = (await Tag.findAll({
            where: {
                appoioName: sequelize.where(sequelize.fn('LOWER', sequelize.col('tag.name')), 'LIKE', `%${searchString}%`)
            },
            attributes: [],
            include: [{
                model: Tutorial,
                as: 'tutorials',
                attributes: [
                    'id',
                    'appoioName',
                    'category',
                    ['createdAt', 'date']
                ],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: [
                        'name',
                    ]
                }],
                where: {
                    id: {
                        [Op.notIn]: tutorialsIds
                    },
                    approved: 1
                }
            }]
        })).map(tag => tag.tutorials).flat();

        tutorialsIds.push(...tagTutorials.map(tutorial => tutorial.id));

        let appTutorials = (await App.findAll({
            where: {
                appoioName: sequelize.where(sequelize.fn('LOWER', sequelize.col('app.name')), 'LIKE', `%${searchString}%`)
            },
            attributes: [],
            include: [{
                model: Tutorial,
                as: 'tutorials',
                attributes: [
                    'id',
                    'appoioName',
                    'category',
                    ['createdAt', 'date']
                ],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: [
                        'name',
                    ]
                }],
                where: {
                    id: {
                        [Op.notIn]: tutorialsIds
                    },
                    approved: 1
                }
            }]
        })).map(app => app.tutorials).flat();

        return { result: true, data: [...tutorials, ...tagTutorials, ...appTutorials] };

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: 'E-mail do usuário já existe no banco' };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
        else if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
        console.log(err);
    }
}

module.exports = { findById, findAll, approve, registerTutorial, deleteTutorial, search };
