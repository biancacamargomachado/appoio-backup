const App = require('../models/App');
const User = require('../models/User');
const Tutorial = require('../models/Tutorial');
const { Op } = require("sequelize");


async function getAll() {
    return await App.findAll(
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
    );
}

async function getByUserId(userId) {
    return await (await User.findOne({
        where: {
            id: userId
        }
    })).getApps(
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
        });
}


async function getExcept(appIds) {
    return await App.findAll({
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
    });
}


async function getTutorials(appId) {
    return await (await App.findOne({ where: { id: appId } })).getTutorials(
        {
            attributes: [
                'id',
                'appoioName',
                'category'
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        });
}


async function update(userId, appIds) {
    let user = await User.findOne({
        where: {
            id: userId
        }
    });

    let apps = await App.findAll({ where: { id: appIds } });

    await user.setApps(apps);

}

module.exports = { getAll, getByUserId, getExcept, getTutorials, update };
