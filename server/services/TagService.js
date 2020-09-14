const tagRepository = require('../repository/TagRepo');

// Função assincrona que registra uma tag e retorna um dicionario de resposta
// Valida usuário já cadastrado
async function register({ name }) {

  return await tagRepository
    .register({
      name,
    })
    .then((tag) => {
      return {
        resp: true,
        code: 201,
        msg: 'Tag registrada',
        data: tag,
      }
    })
    .catch(
      (err) => {
        console.log(err);

        return {
          resp: false,
          code: 401,
          msg: 'Erro: Erro ao cadastrar a tag',
          data: {},
        };
      }
    );

}

module.exports = { register };
