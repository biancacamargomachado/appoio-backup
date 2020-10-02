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

  if (result.result)
    if (result.data)
      return result;
    else
      return { result: false, status: 404, msg: 'Não foi possível recuperar o tutorial' }
  else
    return result;
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
async function getAll() {
  try {
    let result = await tutorialRepository.findAll();

    if (result.result) {
      if (result.data) {
        let tutorials = result.data;
        tutorials = tutorials.map(tutorial => tutorial.toJSON());

        let categoryTutorials = {};

        for (let tutorial of tutorials) {
          let category = tutorial.category;
          delete tutorial.category;

          if (category in categoryTutorials) {
            categoryTutorials[category].push(tutorial);
          }
          else {
            categoryTutorials[category] = [tutorial]
          }
        }

        return { result: true, data: categoryTutorials };
      }
      else
        return { result: false, status: 404, msg: 'Não foi possível recuperar o tutorial' }
    }

    return result;

  } catch (err) {
    return { result: false, status: 500, msg: 'Erro durante a separação das categorias' }
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
  return await tutorialRepository.registerTutorial(tutorialCreationObject);
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

module.exports = { get, getAll, registerTutorial, approve };
