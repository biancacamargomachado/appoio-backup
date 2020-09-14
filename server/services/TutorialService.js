const tutorialRepo = require('../repository/TutorialRepo');

async function register({
  nomeApoio,
  categoria,
  OS,
  versaoOS,
  tags,
  passos
}) {

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

module.exports = { register, getAll };
