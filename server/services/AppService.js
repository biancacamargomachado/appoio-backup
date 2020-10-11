const appRepository = require('../repository/AppRepo');


async function getAll() {
    try {
        let appsResult = await appRepository.getAll();

        let filtered = [];
        if (appsResult.result) {
            let apps = appsResult.data;
            for (let app of apps) {
                if (app) {
                    if (app.tutorials) {
                        if (app.tutorials.length > 0) {
                            filtered.push(app.id);
                        }
                    }
                }
            }
        }
        else {
            return appsResult;
        }

        return { result: true, data: { 'Installed': [], 'NotInstalled': filtered } };

    } catch (err) {
        return { result: false, status: 500, msg: 'Erro durante o filtro de aplicativos' };
    }
}


async function getInstalled(userId) {
    try {
        let installedResult = await appRepository.getByUserId(userId);
        let filteredInstalled = [];

        let installedApps = []
        if (installedResult.result) {
            installedApps = installedResult.data;

            for (let app of installedApps) {
                if (app) {
                    if (app.tutorials) {
                        if (app.tutorials.length > 0) {
                            filteredInstalled.push(app.id);
                        }
                    }
                }
            }
        }
        else {
            return installedResult;
        }

        let notInstalledResult = await appRepository.getExcept(installedApps.map(app => app.id));
        let filteredNotInstalled = [];

        if (notInstalledResult.result) {
            let notInstalledApps = notInstalledResult.data;

            for (let app of notInstalledApps) {
                if (app) {
                    if (app.tutorials) {
                        if (app.tutorials.length > 0) {
                            filteredNotInstalled.push(app.id);
                        }
                    }
                }
            }
        }
        else {
            return notInstalledResult;
        }

        return { result: true, data: { 'Installed': filteredInstalled, 'NotInstalled': filteredNotInstalled } };

    } catch (err) {

        return { result: false, status: 500, msg: 'Erro durante o filtro de aplicativos' };
    }
}

async function getTutorials(appId) {
    try {
        let result = await appRepository.getTutorials(appId);
        if (result.result) {
            if (result.data.length) {
                return result;
            }
            return { result: false, status: 404, msg: 'Não foi possível recuperar os tutoriais do aplicativo' };
        }

        return result;

    } catch (err) {
        return { result: false, status: 500, msg: 'Erro formatando os tutoriais do aplicativo' };
    }
}


async function update(userId, appIds) {
    return await appRepository.update(userId, appIds);
}

module.exports = { getAll, getInstalled, getTutorials, update };
