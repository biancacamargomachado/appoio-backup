const tutorialRepository = require('../repository/TutorialRepo');

//Função que realiza a busca pelos tutoriais da categoria Celular
async function verCelular(){
  return await tutorialRepository
  .findByCategoria(
    'celular'
  )
  .then((tutorials) => {
      return {
        //preencher
      }
    }
  )
  .catch((err) => {
      console.log(err);
      //preencher
    }
  );
}

module.exports = { verCelular };