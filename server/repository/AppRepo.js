const App = require('../models/App');
const User = require('../models/User');
const Tutorial = require('../models/Tutorial');
const { UniqueConstraintError, ForeignKeyConstraintError, TimeoutError, ValidationError } = require('sequelize');
const { Op } = require("sequelize");
const sequelize = require('../database');


async function getAll() {
    try {
        return {
            result: true,
            data: await App.findAll(
                {
                    attributes: [
                        'id'
                    ],
                    include: [
                        {
                            model: Tutorial,
                            as: 'tutorials',
                            attributes: [
                                'id'
                            ]
                        }
                    ]
                }
            )
        };

    } catch (err) {
        if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
        else if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não pode ser repetido: ${err.index}` };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
    }
}

async function getByUserId(userId) {
    try {
        let user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (user) {
            return {
                result: true,
                data: await user.getApps(
                    {
                        attributes: ['id'],
                        include: [
                            {
                                model: Tutorial,
                                as: 'tutorials',
                                attributes: [
                                    'id'
                                ]
                            }
                        ]
                    })
            };
        }

        return { result: false, status: 404, msg: 'Usuário não encontrado' };

    } catch (err) {
        if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
        else if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não pode ser repetido: ${err.index}` };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
    }
}


async function getExcept(appIds) {
    try {
        return {
            result: true,
            data: await App.findAll({
                where: {
                    id: {
                        [Op.notIn]: appIds
                    }
                },
                include: [
                    {
                        model: Tutorial,
                        as: 'tutorials',
                        attributes: [
                            'id'
                        ]
                    }
                ]
            })
        }

    } catch (err) {
        if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
        else if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não pode ser repetido: ${err.index}` };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
    }
}


async function getTutorials(appId) {
    try {
        let app = await App.findOne({ where: { id: appId } });
        if (app) {
            return {
                result: true,
                data: await app.getTutorials(
                    {
                        attributes: [
                            'id',
                            'appoioName',
                            'category',
                            'operatingSystem'
                        ],
                        order: [
                            ['createdAt', 'DESC']
                        ]
                    })
            };
        }
        else {
            return { result: false, status: 404, msg: 'Aplicativo não encontrado' };
        }

    } catch (err) {
        if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
        else if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não pode ser repetido: ${err.index}` };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }

    }
}

async function getInstalled(userId) {
    try {
        let user = await User.findOne({ where: { id: userId } });

        return {
            result: true,
            data: await user.getApps(
                {
                    attributes: [
                        'id'
                    ]
                }
            )
        };

    } catch (err) {
        if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
        else if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não pode ser repetido: ${err.index}` };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
    }
}


async function update(userId, appIds) {
    const transaction = await sequelize.transaction();
    try {
        let user = await User.findOne({
            transaction: transaction,
            where: {
                id: userId
            }
        });
        if (user) {
            let apps = await App.findAll({ transaction: transaction, where: { id: appIds } });

            if (apps.length != appIds.length) {
                return { result: false, status: 404, msg: 'Alguns aplicativos não foram encontrados' };
            }

            await user.setApps(apps, { transaction: transaction });

            await transaction.commit();

            return { result: true, data: {} };
        }
        else {
            return { result: false, status: 404, msg: 'Usuário não encontrado' };
        }

    } catch (err) {
        await transaction.rollback();

        if (err instanceof ValidationError) {
            return { result: false, status: 400, msg: `Constraint referente à coluna: ${err.errors[0].validatorKey} falhou` };
        }
        else if (err instanceof UniqueConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não pode ser repetido: ${err.index}` };
        }
        else if (err instanceof ForeignKeyConstraintError) {
            return { result: false, status: 400, msg: `Valor informado não foi encontrado para referencia: ${err.index}` };
        }
        else if (err instanceof TimeoutError) {
            return { result: false, status: 408, msg: 'Tempo de execução da query excedeu o limite de tempo' };
        }
    }

}

module.exports = { getAll, getByUserId, getExcept, getTutorials, getInstalled, update };
