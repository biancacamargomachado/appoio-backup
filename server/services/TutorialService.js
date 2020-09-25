const tutorialRepository = require('../repository/TutorialRepo');

/*
 * Função que realiza a busca de tutoriais dado o id
 * 
 * @example
 *      get(i); // Tutorial(id:1)
 * 
 * @param {id} obrigatório ID do tutorial que se deseja buscar
 * 
 * @returns {Tutorial}
 */
async function get(id) {
  try {
    let tutorial = await tutorialRepository.findById(id);

    return tutorial.toJSON();

  } catch (err) {
    throw err;
  }
}

/*
 * Função que retorna o id e o nome de todos os tutoriais registrados, organizados em um array para cada categoria registrada
 * 
 * @example
 *    getAll(); // {"tutorials": {
 *                                 "conceitos": [{"id": 1, "appoioName": "O que é QR Code?"}], 
 *                                 "celular": [{"id": 2, "appoioName": "Como inverter a câmera no Android?"}]
 *                 }}
 * 
 * @returns {Tutorials}
 */
async function getAll() {
  try {
    let tutorials = await tutorialRepository.findAll();
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

    return categoryTutorials;

  } catch (err) {
    throw err;
  }
}

/*
 * Função que registra um novo tutorial a partir dos dados informados
 * 
 * @param {tutorialCreationObject} obrigatório o objeto com os dados do tutorial informados na requisição
 * 
 * @returns {}
 */
async function registerTutorial(tutorialCreationObject) {
  try {


    return await tutorialRepository.registerTutorial(tutorialCreationObject);
  } catch (err) {
    throw err;
  }
}

module.exports = { get, getAll, registerTutorial };
