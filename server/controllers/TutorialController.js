/**
 * @author Fernanda Mello
 */

const tutorialService = require('../services/TutorialService');

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



module.exports = { getAll };