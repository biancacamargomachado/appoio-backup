const appRepository = require('../repository/AppRepo');


async function getAll() {
    try {
        let apps = await appRepository.getAll();

        let filtered = [];
        for (let i = 0; i < apps.length; i++) {
            let app = apps[i];
            if (app) {
                if (app.tutorials) {
                    if (app.tutorials.length > 0) {
                        filtered.push(app.id);
                    }
                }
            }
        }

        return { result: true, data: { 'Installed': [], 'NotInstalled': filtered } };

    } catch (err) {
        return { result: false, status: 500, msg: 'Erro durante o filtro de aplicativos' };
    }
}


async function getInstalled(userId) {
    try {
        let installedApps = await appRepository.getByUserId(userId);
        let notInstalledApps = await appRepository.getExcept(installedApps.map(app => app.id));

        let filteredInstalled = [];
        for (let i = 0; i < installedApps.length; i++) {
            let app = installedApps[i];
            if (app) {
                if (app.tutorials) {
                    if (app.tutorials.length > 0) {
                        filteredInstalled.push(app.id);
                    }
                }
            }
        }

        let filteredNotInstalled = [];
        for (let i = 0; i < notInstalledApps.length; i++) {
            let app = notInstalledApps[i];
            if (app) {
                if (app.tutorials) {
                    if (app.tutorials.length > 0) {
                        filteredNotInstalled.push(app.id);
                    }
                }
            }
        }

        if (filteredInstalled.length == 0 && filteredNotInstalled.length == 0) {
            return { result: false, status: 404, msg: 'Nenhum aplicativo encontrado' };
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

        result.data = result.data.map(tutorial => tutorial.toJSON());
        return result;

    } catch (err) {
        return { result: false, status: 500, msg: 'Erro formatando os tutoriais do aplicativo' };
    }
}


async function update(userId, appIds) {
    return await appRepository.update(userId, appIds);
}

module.exports = { getAll, getInstalled, getTutorials, update };
