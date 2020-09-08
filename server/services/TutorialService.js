const tutorialRepo = require ('../repository/TutorialRepo');

async function register({nomeApoio,categoria,OS,versaoOS,tags}){
      
    return await tutorialRepo
      .register({
        nomeApoio,
        categoria,
        OS,
        versaoOS,
        tags
      })
      .then((tutorial) => {
        return {
          resp: true,
          code: 201,
          msg: 'Tutorial registrado',
          data: tutorial,
        }
      })
      .catch(
        (err) => {
          console.log(err);
  
          return {
            resp: false,
            code: 401,
            msg: 'Erro: nome de tutorial já cadastrado',
            data: {},
          };
        }
      );
  
  }
  module.exports = {register}

  //routes>controller>services>repository>model