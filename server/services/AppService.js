const appRepository = require('../repository/AppRepo');


async function getAll() {
    try {
        let apps = await appRepository.getAll();

        let filtered = [];
        for (let i = 0; i < apps.length; i++) {
            let app = apps[i];
            if (app)
                if (app.tutorials.length > 0)
                    filtered.push(app.id);
        }

        return {'Installed': [], 'NotInstalled': filtered};

    } catch (err) {
        throw err;
    }
}


async function getInstalled(userId) {
    try {
        let installedApps = await appRepository.getByUserId(userId);
        let notInstalledApps = await appRepository.getExcept(installedApps.map(app => app.id));

        let filteredInstalled = [];
        for (let i = 0; i < installedApps.length; i++) {
            let app = installedApps[i];
            if (app)
                if (app.tutorials.length > 0)
                    filteredInstalled.push(app.id);
        }

        let filteredNotInstalled = [];
        for (let i = 0; i < notInstalledApps.length; i++) {
            let app = notInstalledApps[i];
            if (app)
                if (app.tutorials.length > 0)
                    filteredNotInstalled.push(app.id);
        }

        return {
            'Installed': filteredInstalled,
            'NotInstalled': filteredNotInstalled
        }

    } catch (err) {
        throw err;
    }
}

async function getTutorials(appId) {
    try {
        return (await appRepository.getTutorials(appId)).map(tutorial => tutorial.toJSON());
    } catch (err) {
        throw err;
    }
}


async function update(userId, appIds) {
    try {
        await appRepository.update(userId, appIds);
    } catch (err) {
        throw err;
    }
}

module.exports = { getAll, getInstalled, getTutorials, update };
