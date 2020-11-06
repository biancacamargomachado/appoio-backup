const tutorialRepository = require('../repository/TutorialRepo');

/*
 * Função que realiza a busca de tutoriais dado o id
 * 
 * @example
 *      get(1); // Tutorial
 * 
 * @param {id} obrigatório ID do tutorial que se deseja buscar
 * 
 * @returns {Tutorial}
 */
async function get(id) {
    let result = await tutorialRepository.findById(id);

    if (result.result) {
        if (result.data) {
            result.data = result.data.toJSON();

            if (result.data.tags) {
                let tags = result.data.tags;
                for (let tag of tags)
                    delete tag.tutorial_tag
            }
            
            return result;
        }

        else {
            return { result: false, status: 404, msg: 'Não foi possível recuperar o tutorial' };
        }
    }
    else {
        return result;
    }
}

/*
 * Função que retorna o id e o nome de todos os tutoriais registrados, em um array organizado por categoria
 * 
 * @example
 *    getAll(); // {
 *                   "category": [Tutorial, Tutorial], 
 *                 }
 * 
 * @returns {dict}
 */
async function getAll(approved) {
    try {
        let result = await tutorialRepository.findAll(approved);

        if (result.result) {
            if (approved == 0) {
                return result;
            }

            let tutorials = result.data.map(tutorial => tutorial.toJSON());
            let categoryTutorials = {};

            for (let tutorial of tutorials) {
                let category = tutorial.category;
                delete tutorial.category;

                if (category in categoryTutorials) {
                    categoryTutorials[category].push(tutorial);
                }
                else {
                    categoryTutorials[category] = [tutorial];
                }
            }

            return { result: true, data: categoryTutorials };

        }

        return result;

    } catch (err) {
        return { result: false, status: 500, msg: 'Erro durante a separação das categorias' };
    }
}

/*
 * Função que registra um novo tutorial a partir dos dados informados
 * 
 * @param {tutorialCreationObject} obrigatório o objeto com os dados do tutorial informados na requisição
 * 
 * @returns {Tutorial}
 */
async function registerTutorial(tutorialCreationObject) {
    try {
        let result = await tutorialRepository.registerTutorial(tutorialCreationObject);

        if (result.result) {
            let tutorial = result.data.tutorial;
            let user = result.data.user;
            let tags = result.data.tags;

            let userText = `<p style='font-size:18px'><b>Informações do usuário:</b></p>\nNome: ${user.name}`;
            let tutorialText = `<p style='font-size:18px'><b>Informações do tutorial:</b></p>\nNome: ${tutorial.appoioName}\nCategoria: ${tutorial.category}`;
            let tagsText = `<p style='font-size:18px'><b>Tags associadas:</b></p>#${tags.map(tag => tag.name.replace(' ', '')).join(' #')}`

            let subject = `Appoio pendente - ${tutorial.appoioName}`;
            let text = `<html><p style='font-size:28px'><b>Novo tutorial pendente de aprovação</b></p>\n\n`

            text += `${userText}\n\n${tutorialText}\n\n${tagsText}</html>`;

            return { result: true, data: { subject: subject, text: text } };
        }

        return result;

    } catch (err) {
        console.log(err);
        return { result: false, status: 500, msg: 'Erro durante a construção do corpo do e-mail' };
    }
}

/*
 * Função que atualiza um tutorial dado seu id, tornando ele aprovado
 * 
 * @param {id} obrigatório o id do tutorial a ser atualizado
 * 
 * @returns {Tutorial}
 */
async function approve(id) {
    return await tutorialRepository.approve(id);
}

async function deleteTutorial(tutorialId) {
    let result = await tutorialRepository.deleteTutorial(tutorialId);

    if (result.data == 0) {
        return { result: false, status: 400, msg: 'Tutorial não encontrado para remoção' };
    }

    return result;
}

async function search(searchString) {
    try {
        searchString = searchString.toLowerCase();
    } catch (err) {
        return { result: false, status: 400, msg: 'Formato de mensagem incorreto' };
    }

    try {
        let result = await tutorialRepository.search(searchString);

        if (result.result) {
            result.data = result.data.sort((a, b) => {
                let dateA = new Date(a['date']);
                let dateB = new Date(b['date']);

                return (dateA > dateB) - (dateA < dateB)
            });
        }

        return result;

    } catch (err) {
        console.log(err);
        return { result: false, status: 500, msg: 'Erro durante a ordenação dos tutoriais' };
    }

}

module.exports = { get, getAll, registerTutorial, approve, deleteTutorial, search };
