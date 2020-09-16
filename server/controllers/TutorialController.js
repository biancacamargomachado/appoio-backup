const tutorialService = require('../services/TutorialService');
const tagService = require('../services/TagService');

// Função que registra um tutorial juntamente com os passos necessários para executá-lo e retorna um JSON de resposta
async function register(req, res) {
  const { userId, appId, appoioName, category, operationalSystem, operationalSystemVersion, tags, steps } = req.body;

  try {

    const returnedTutorial = await tutorialService.registerTutorial({
      userId,
      appId,
      appoioName,
      category,
      operationalSystem,
      operationalSystemVersion,
      steps,
    });

    if(tags !== undefined){
      await tagService.registerTags({ tutorial: returnedTutorial, tags });
    }


    return res.json({
      resp: true,
      status: 201,
      msg: 'Tutorial registered',
      data: {
        tutorial: {
          id: returnedTutorial.dataValues.id,
          appoioName: returnedTutorial.dataValues.appoioName,
        }
      }
    });

  } catch (err) {
    console.log(err);

    return res.json({
      resp: false,
      status: 500,
      msg: 'Error registering tutorial\n' + err
    });
  }
}

//Função que busca os tutoriais dependente da categoria e retorna um JSON de resposta 
async function getAll(req, res) {
  try {
    const category = req.params.category;
    const tutorials = await tutorialService.getAll({ category });

    return res.json({
      resp: true,
      status: 200,
      msg: 'Tutorials recovered',
      data: {
        tutorials: tutorials.map(
          (tutorial) => {
            return {
              id: tutorial.dataValues.id,
              appoioName: tutorial.dataValues.appoioName
            }
          })
      }
    });
  }
  catch (err) {
    console.log(err);

    return res.json({
      resp: false,
      status: 500,
      msg: 'Unkown error found on search: ' + err,
      data: {}
    });
  }
}

// Função que busca os tutoriais por seu id
async function get(req, res){
  try{
    const id = req.params.id;
    const tutorial = await tutorialService.get(id);

    return res.json({
      resp: true,
      status: 200,
      msg: 'Tutorial recovered',
      data: {
          tutorial
      }
    })

  } catch(err){
    console.log(err);

    return res.json({
      resp: false,
      status: 500,
      msg: 'Unkown error found on search: ' + err,
      data: {}
    });
  }
}


module.exports = { register, getAll, get };
