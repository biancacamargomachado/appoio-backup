const appRepository = require('../repository/AppRepo');


async function getAll(userId) {
    try {
        let apps = await appRepository.getAll();

        let formattedApps = { 'installed': [], 'not-installed': [] };
        for (let i = 0; i < apps.length; i++) {
            if (userId in apps[i].users)
                key = 'installed'
            else
                key = 'not-installed'

            let app = apps[i].toJSON();
            delete app.users
            formattedApps[key].push(app);
        }

        return formattedApps;

    } catch (err) {
        throw err;
    }
}


async function get(userId) {
    try {
        return (await appRepository.getByUserId(userId)).map(app => {
            app = app.toJSON();
            delete app['user_app'];
            return app;
        });

    } catch (err) {
        throw err;
    }
}


async function register(userId, appNames) {
    try {
        await appRepository.register(userId, appNames);
    } catch (err) {
        throw err;
    }
}


async function update(userId, appNames) {
    try {
        await appRepository.update(userId, appNames);
    } catch (err) {
        throw err;
    }
}

module.exports = { getAll, get, register, update };
