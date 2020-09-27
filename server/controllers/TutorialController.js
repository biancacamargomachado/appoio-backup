const tutorialService = require('../services/TutorialService');


async function get(req, res) {
  if (req.session.userId === undefined)
    return res.json({
      resp: false,
      status: 401,
      msg: 'User not logged',
      data: {}
    });

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


async function getAll(req, res) {
  if (req.session.userId === undefined)
    return res.json({
      resp: false,
      status: 401,
      msg: 'User not logged',
      data: {}
    });

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

async function search(req, res){
  let userId = req.session.userId;

  if (userId === undefined)
    return res.json({
      resp: false,
      status: 401,
      msg: 'User not logged',
      data: {}
    });

    // Titulo
    // Funcao de levenshtein de proximidade
    // Uso de Like
    
    // Tags
    // Literal
    // Uso de like

    // Aplicativos
    // Literal
    // Uso de like

}


async function register(req, res) {
  let userId = req.session.userId;

  if (userId === undefined)
    return res.json({
      resp: false,
      status: 401,
      msg: 'User not logged',
      data: {}
    });

  let { appoioName, category, appId, appVersion, operatingSystem, operatingSystemVersion, tags, steps } = req.body;

  if (appId)
    appId = parseInt(appId);

  if (tags)
    tags = JSON.parse(tags);


  if (steps) {
    steps = JSON.parse(steps);

    let files = req.files;
    if (files)
      for (let i = 0; i < files.length; i++)
        steps[i].imgURL = files[i].secureURL

  }

  let creationObject = {
    userId,
    appoioName,
    category,
    appId,
    appVersion,
    operatingSystem,
    operatingSystemVersion,
    steps,
    tags
  }

  Object.keys(creationObject).forEach(
    key => creationObject[key] === undefined ? delete creationObject[key] : {}
  );

  try {
    await tutorialService.registerTutorial(creationObject);

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



// ADMINISTRADOR

async function getAllPending(req, res) {

  if (req.session.userId === undefined)
  return res.json({
    resp: false,
    status: 401,
    msg: 'User not logged',
    data: {}
  });

  if(req.session.adm == false)
  return res.json({
    resp: false,
    status: 401,
    msg: 'User not authorized',
    data: {}
  });

  try {
    let tutorials = await tutorialService.getAllPending();

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


async function getPending(req, res) {

  if (req.session.userId === undefined)
    return res.json({
      resp: false,
      status: 401,
      msg: 'User not logged',
      data: {}
    });

  if(req.session.adm == false)
  return res.json({
    resp: false,
    status: 401,
    msg: 'User not authorized',
    data: {}
  });
  

  try {
    let id = req.params.id;
    let tutorial = await tutorialService.getPending(id);

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


async function approve(req, res) {

  if (req.session.userId === undefined)
  return res.json({
    resp: false,
    status: 401,
    msg: 'User not logged',
    data: {}
  });

  if(req.session.adm == false)
  return res.json({
    resp: false,
    status: 401,
    msg: 'User not authorized',
    data: {}
  });

  
  try {
    let id = req.params.id;
    let tutorial = await tutorialService.approve(id);

    return res.json({
      resp: true,
      status: 200,
      msg: 'Tutorial approved',
      data: {
        tutorial
      }
    })

  } catch (err) {
    console.log(err);

    return res.json({
      resp: false,
      status: 500,
      msg: 'Unkown error found on approve: ' + err,
      data: {}
    });
  }
}


module.exports = { get, getAll, search, register, getAllPending, getPending, approve };
