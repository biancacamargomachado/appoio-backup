const tutorialService = require('../services/TutorialService');


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


async function register(req, res) {
  let { userId, appoioName, category, appId, appVersion, operatingSystem, operatingSystemVersion, tags, steps } = req.body;

  if (userId)
    userId = parseInt(userId);

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


module.exports = { get, getAll, register };
