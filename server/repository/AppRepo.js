const App = require('../models/App');
const User = require('../models/User');


async function getAll() {
    return await App.findAll(
        {
            attributes: [
                'name',
                'logoURL'
            ],
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: ['id']
                }
            ]
        }
    );
}

async function getByUserId(userId) {
    return (await User.findOne({
        where: {
            id: userId
        }
    })).getApps({ attributes: ['name', 'logoURL'] });
}


async function getTutorials(appName) {
    return await (await App.findOne({ where: { name: appName } })).getTutorials(
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


async function register(userId, appNames) {
    let user = await User.findOne({
        where: {
            id: userId
        }
    });
    let apps = await App.findAll({ where: { name: appNames } });

    await user.addApps(apps);
}


async function update(userId, appNames) {
    let user = await User.findOne({
        where: {
            id: userId
        }
    });

    let apps = await App.findAll({ where: { name: appNames } });

    await user.setApps(apps);

}

module.exports = { getAll, getByUserId, getTutorials, register, update };
