const tutorialService = require('../services/TutorialService');
const tagService = require('../services/TagService');

// Função que busca os tutoriais por seu id
async function get(req, res) {
  try {
    let id = req.params.id;
    let tutorial = await tutorialService.get(id);

    return res.json({
      resp: true,
      status: 200,
      msg: 'Tutorial recovered',
      data: {
        tutorial
      }
    })

  } catch (err) {
    console.log(err);

    return res.json({
      resp: false,
      status: 500,
      msg: 'Unkown error found on get: ' + err,
      data: {}
    });
  }
}

//Função que busca os tutoriais retorna um JSON de resposta separado por categoria
async function getAll(req, res) {
  try {
    let tutorials = await tutorialService.getAll();

    return res.json({
      resp: true,
      status: 200,
      msg: 'Tutorials recovered',
      data: {
        tutorials: tutorials
      }
    });
  }
  catch (err) {
    console.log(err);

    return res.json({
      resp: false,
      status: 500,
      msg: 'Unkown error found on getAll: ' + err,
      data: {}
    });
  }
}

// Função que registra um tutorial juntamente com os passos necessários para executá-lo e retorna um JSON de resposta sem corpo
async function register(req, res) {
  let { userId, appId, appoioName, category, operationalSystem, operationalSystemVersion, tags, steps } = req.body;
  let files = req.files;

  try {
    let tutorial = await tutorialService.registerTutorial(
      {
        userId,
        appId,
        appoioName,
        category,
        operationalSystem,
        operationalSystemVersion,
        steps,
        files
      }
    );

    if (tags !== undefined) {
      await tagService.registerTags(tutorial, tags);
    }

    return res.json({
      resp: true,
      status: 201,
      msg: 'Tutorial registered',
      data: {}
    });

  } catch (err) {
    console.log(err);

    return res.json({
      resp: false,
      status: 500,
      msg: 'Unkown error found on registration: ' + err,
      data: {}
    });
  }
}


module.exports = { get, getAll, register };
