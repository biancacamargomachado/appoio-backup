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

    const steps = await tutorial.getSteps();
    const tags = await tutorial.getTags();

    return res.json({
      resp: true,
      status: 200,
      msg: 'Tutorial recovered',
      data: {
          tutorial: {
            appoioName: tutorial.dataValues.appoioName,
            appVersion: tutorial.dataValues.appVersion,
            operatingSystem: tutorial.dataValues.operatingSystem,
            operatingSystemVersion: tutorial.dataValues.operatingSystemVersion,
            userId: tutorial.dataValues.userId,
          },
          steps: [
              steps.map(
                (steps) => {
                  return {
                    description: steps.dataValues.description,
                    imgUrl: steps.dataValues.imgUrl,
                    videoUrl: steps.dataValues.videoUrl,
                  }
              })
          ],
          tags: [
            tags.map(
              (tags) => {
                return {
                  name: tags.dataValues.name,
                }
            })
          ]
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
