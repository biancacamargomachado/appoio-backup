const tutorialService = require('../services/TutorialService');


async function get(tutorialId) {
    try {
        let result = await tutorialService.get(tutorialId);

        if (result.result) {
            return {
                result: true,
                status: 200,
                msg: 'Tutorial recuperado',
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
            msg: 'Erro desconhecido encontrado durante a recuperação do tutorial',
            data: {}
        };
    }
}


async function getAll(approved) {
    try {
        let result = await tutorialService.getAll(approved);

        if (result.result)
            return {
                result: true,
                status: 200,
                msg: 'Tutoriais recuperados',
                data: result.data
            };

        return {
            result: false,
            status: result.status,
            msg: result.msg,
            data: {}
        };
    }
    catch (err) {
        return {
            result: false,
            status: 500,
            msg: 'Erro desconhecido encontrado durante a recuperação dos tutoriais',
            data: {}
        };
    }
}

async function search(searchString) {
    // Titulo
    // Funcao de levenshtein de proximidade
    // Uso de Like

    // Tags
    // Literal
    // Uso de like

    // Aplicativos
    // Literal
    // Uso de like

}


async function register(creationObject) {
    Object.keys(creationObject).forEach(
        key => creationObject[key] === undefined ? delete creationObject[key] : {}
    );
    
    try {
        let result = await tutorialService.registerTutorial(creationObject);

        if (result.result)
            return {
                result: true,
                status: 201,
                msg: 'Tutorial registrado',
                data: {}
            };

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
            msg: 'Erro desconhecido encontrado durante o registro do tutorial',
            data: {}
        };

    }
}

async function deleteTutorial(tutorialId) {
    try {
        let result = await tutorialService.deleteTutorial(tutorialId);

        if (result.result) {
            return {
                result: true,
                status: 204,
                msg: 'Tutorial deletado',
                data: {},

            };
        }
        return {
            result: true,
            status: result.status,
            msg: result.msg,
            data: {}
        }

    }
    catch (err) {
        console.log(err);

        return {
            resp: false,
            status: 500,
            msg: 'Erro desconhecido encontrado durante a remoção do tutorial',
            data: {}
        };
}

async function approve(tutorialId) {
    try {
        let result = await tutorialService.approve(tutorialId);

        if (result.result)
            return {
                result: true,
                status: 204,
                msg: 'Tutorial aprovado',
                data: {}
            };

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
            msg: 'Erro desconhecido encontrado durante a aprovação do tutorial',
            data: {}
        };
    }
}

module.exports = { get, getAll, search, register, approve, deleteTutorial };
