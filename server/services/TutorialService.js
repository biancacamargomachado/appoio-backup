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

module.exports = { get, getAll, registerTutorial, getAllPending };
