const appService = require('../services/AppService');


async function getAll(userId) {
    try {
        if (userId === undefined)
            var result = await appService.getAll();
        else
            var result = await appService.getInstalled(userId);

        if (result.result) {
            return {
                result: true,
                status: 200,
                msg: 'Aplicativos recuperados',
                data: result.data
            };
        }
        return {
            result: false,
            status: result.status,
            msg: result.msg,
            data: {}
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

        if (result.result) {
            return {
                result: true,
                status: 200,
                msg: 'Tutoriais do aplicativo recuperados',
                data: result.data
            };
        }
        return {
            result: false,
            status: result.status,
            msg: result.msg,
            data: {}
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


async function update(userId, appIds) {
    try {
        let result = await appService.update(userId, appIds);
        console.log(result)
        if (result.result) {
            return {
                result: true,
                status: 204,
                msg: 'Aplicativos do usuário foram atualizados',
                data: result.data
            };
        }
        return {
            result: false,
            status: result.status,
            msg: result.msg,
            data: {}
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
