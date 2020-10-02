const appService = require('../services/AppService');


async function getAll(userId) {
    try {
        if (userId === undefined)
            let result = await appService.getAll();
        else
            let result = await appService.getInstalled(userId);

        return {
            result: true,
            status: 200,
            msg: 'Applicativos recuperados',
            data: result.data
        };
    }
    catch (err) {
        console.log(err);

        return {
            result: false,
            status: 500,
            msg: 'Erro desconhecido durante a recuperação dos aplicativos',
            data: {}
        };
    }
}


async function getTutorials(appId) {
    try {
        let result = await appService.getTutorials(appId);

        return {
            result: true,
            status: 200,
            msg: 'Tutoriais do aplicativo recuperados',
            data: result.data
        };
    }
    catch (err) {
        console.log(err);

        return {
            result: false,
            status: 500,
            msg: 'Erro desconhecido durante a recuperação dos tutoriais do aplicativo',
            data: {}
        };
    }

}


async function update(appIds) {
    try {
        let result = await appService.update(userId, appIds);

        return {
            result: true,
            status: 204,
            msg: 'Aplicativos do usuário foram atualizados',
            data: result.data
        };

    } catch (err) {
        console.log(err);

        return {
            result: false,
            status: 500,
            msg: 'Erro desconhecido durante a atualização dos aplicativos do usuário',
            data: {}
        };
    }
}


module.exports = { getAll, getTutorials, update };
