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
  let { userId, appoioName, category, appId, appVersion, operatingSystem, operatingSystemVersion, tags, steps } = req.body;
  let files = req.files;

  // se nenhum passo tiver imagens, o request não passa pelo multer
  // e tags e steps não são parseadas de string para JSON
  if (typeof tags === "string") {
    tags = JSON.parse(tags);
  }

  if (typeof steps === "string") {
    steps = JSON.parse(steps);
  }

  // garantir que estará null para não ter problemas de constraints
  if (category !== "aplicativos") {
    appId = null;
  }

  if (files) files.forEach(file => {
    // formato do nome de cada imagem: "<step-order>.[jpg,png]"
    const fileOrder = parseInt(file.originalName.split(".")[0]);

    const step = steps.find(step => parseInt(step.order) === fileOrder);
    step.imgURL = file.secureUrl
  });

  try {
    let tutorial = await tutorialService.registerTutorial(
      {
        userId,
        appoioName,
        category,
        appId,
        appVersion,
        operatingSystem,
        operatingSystemVersion,
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
// Funcao para deletar um tutorial
async function deleteTutorial(req,res){
  if (req.session.userId === undefined)
    return res.json({
      resp: false,
      status: 401,
      msg: "User not logged",
      data: {},
    });

  if (req.session.adm == false)
    return res.json({
      resp: false,
      status: 403,
      msg:
        "User not authorized. User must login with administrator account to perform this action",
      data: {},
    });

    try {
      let id = req.params.id;
      await tutorialService.deleteTutorial(id);
      return res.json({
        resp: true,
        status: 200,
        msg:'Tutorial deleted',
        data: {},
        
      });

    }
    catch (err){
       console.log(err);

      return res.json({
        resp: false,
        status: 500,
        msg: 'Unkown error found on delete: ' + err,
        data: {}
     });
  }
}

    



module.exports = { get, getAll, register, deleteTutorial };
