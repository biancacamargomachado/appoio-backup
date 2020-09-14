/**
 * @author Fernanda Mello
 */

const tutorialRepository = require('../repository/TutorialRepo');

//Função que realiza a busca pelos tutoriais da categoria Celular
async function getAll(category){
  return await tutorialRepository
  .findByCategory(
    category
  )
  .then((tutorials) => {
      return {
        resp: true,
        code: 200,
        msg: `Tutoriais de ${category} encontrados`,
        data: tutorials,
      }
    }
  )
  .catch((err) => {
      console.log(err);
      
      return {
        resp: false,
        code: 404,
        msg: `Não foi possível encontrar os tutoriais de ${category}`,
        data: {},
      }
    }
  );
}

module.exports = { getAll };