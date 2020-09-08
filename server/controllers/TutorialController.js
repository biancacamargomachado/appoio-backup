const tutorialService = require ('../services/TutorialService');

async function register(req, res) {
    const {nomeApoio, categoria, OS, versaoOS, tags} = req.body;
    
    return await tutorialService
      .register({
        nomeApoio, 
        categoria, 
        OS, 
        versaoOS, 
        tags
      })
      .then(
        (tutorial) => res.json(tutorial)
      )
      .catch(
        function (err) {
          console.log(err);
  
          return {
            resp: false,
            status: 500,
            msg: 'Unkown error found on tutorial registration: ' + err,
            data: {}
          }
        }
      );
  }
  module.exports = {register}

  //routes>controller>services>repository>model