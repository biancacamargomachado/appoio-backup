const tutorialRepository = require('../repository/TutorialRepo');


//Função que realiza a busca pelos tutoriais dado o id
async function get(id) {
  try {
    let tutorial = await tutorialRepository
      .findById(
        id
      );

    return tutorial.toJSON();

  } catch (err) {
    throw err;
  }
}

//Função que realiza a busca de todos tutoriais
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

// Função que registra um tutorial juntamente com os passos necessários para executá-lo
async function registerTutorial(tutorialCreationObject) {
  try {
    Object
      .keys(tutorialCreationObject)
      .forEach(
        key => tutorialCreationObject[key] === undefined ? delete tutorialCreationObject[key] : {}
      );

    return await tutorialRepository
      .registerTutorial(
        tutorialCreationObject
      );
  } catch (err) {
    throw err;
  }
}

module.exports = { get, getAll, registerTutorial };
