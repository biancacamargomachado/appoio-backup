const tutorialRepository = require('../repository/TutorialRepo');

// Função que registra um tutorial juntamente com os passos necessários para executá-lo
async function registerTutorial({ userId, appId, appoioName, category, operationalSystem, operationalSystemVersion, steps }) {
  try {
    return await tutorialRepository.registerTutorial({ userId, appId, appoioName, category, operationalSystem, operationalSystemVersion, steps });
  } catch (err) {
    throw err;
  }
}

//Função que realiza a busca pelos tutoriais dado a categoria
async function getAll(category) {
  try {
    return await tutorialRepository.findByCategory({ category });
  } catch (err) {
    throw err;
  }
}

module.exports = { registerTutorial, getAll };
