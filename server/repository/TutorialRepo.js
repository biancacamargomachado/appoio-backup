const Tutorial = require('../models/Tutorial');
const Step = require('../models/Step');
const Tag = require('../models/Tag');
const User = require('../models/User');
const sequelize = require('../database');
const { UniqueConstraintError, ForeignKeyConstraintError, TimeoutError, ValidationError } = require('sequelize');

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
                    'category'
                ],
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

        return { result: true };

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
            if (tags.length) {
                let createdTags = [];
                for (let i = 0; i < tags.length; i++) {
                    createdTags.push((await Tag.findOrCreate({ transaction: transaction, where: tags[i] }))[0]);
                }

                console.log("\n\nCreated tags after:", createdTags, "\n\n");
                await tutorial.setTags(createdTags, { transaction: transaction });
            }

            await transaction.commit();

            return { result: true };
        }
        else {
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
    try{
        const tutorial = await Tutorial.findOne({
            where: {
                id: tutorialId,
                approved: 0,
            },
            include: [{
                model: Step,
                as: 'steps'
            }]
        })
        return {
            result: true,
            data: await tutorial.destroy()
        }
        
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

module.exports = { findById, findAll, approve, registerTutorial, deleteTutorial };
