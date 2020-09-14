const tutorialService = require ('../services/TutorialService');

async function register(req, res) {
    const {nomeApoio, categoria, OS, versaoOS, tags, passos} = req.body;
    console.log(tags);
    return await tutorialService
      .register({
        nomeApoio, 
        categoria, 
        OS, 
        versaoOS, 
        tags,
        passos      
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

//Função que busca os tutoriais da categoria Celular e retorna um json de resposta 
async function getAll(req,res){
  const category = req.params.category;

  return await tutorialService.
  getAll(category)
  .then(
    (tutorials) => res.json(tutorials)
  )
  .catch(
    function (err) {
      console.log(err);
    
      return {
        resp: false,
        status: 500,
        msg: 'Unkown error found on search: ' + err,
        data: {}
      }
    }
  );  
}


module.exports = { register, getAll };
