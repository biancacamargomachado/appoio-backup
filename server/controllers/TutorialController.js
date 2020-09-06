const tutorialService = require('../services/TutorialService');

//Função que busca os tutoriais da categoria Celular e retorna um json de resposta 
async function getCelular(req,res){
  return await tutorialService.
  getCelular()
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



module.exports = { getCelular };