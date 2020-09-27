const tutorialRepository = require('../repository/TutorialRepo');


async function get(id) {
  try {
    let tutorial = await tutorialRepository.findById(id);

    return tutorial.toJSON();

  } catch (err) {
    throw err;
  }
}


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


async function registerTutorial(tutorialCreationObject) {
  try {


    return await tutorialRepository.registerTutorial(tutorialCreationObject);
  } catch (err) {
    throw err;
  }
}

/*
 * Função que realiza a busca de todos os tutoriais pendentes (não aprovados)
  * 
 * @returns [ { Tutorials} ]
 */
async function getAllPending(){
  try {
    let tutorials = await tutorialRepository.findAllPending();
    tutorials = tutorials.map(tutorial => tutorial.toJSON());

    return tutorials;

  } catch (err) {
    throw err;
  }
}

/*
 * Função que busca um tutorial não aprovado, dado seu id
 *
 * @param {id} obrigatório o id do tutorial a ser atualizado
 * 
 * @returns {Tutorial}
 */
async function getPending(id){
  try{
    let tutorial = await tutorialRepository.findPendingById(id);

    return tutorial.toJSON();

  } catch (err) {
    throw err;
  }
}

/*
 * Função que atualiza um tutorial dado seu id, tornando ele aprovado
 * 
 * @param {id} obrigatório o id do tutorial a ser atualizado
 * 
 */
async function approve(id){
  try{
    await tutorialRepository.approve(id);

  } catch (err) {
    throw err;
  }
}

module.exports = { get, getAll, registerTutorial, getAllPending, getPending, approve };
