// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const tagService = require('../services/TagService');


// Função assincrona que realiza o regisgtro de uma tag e retorna um JSON de resposta
async function register(req, res) {
  const { name } = req.body;

  return await tagService
    .register({
      name,
    })
    .then(
      (tag) => res.json(tag)
    )
    .catch(
      function (err) {
        console.log(err);

        return {
          resp: false,
          status: 500,
          msg: 'Unkown error found on registration: ' + err,
          data: {}
        }
      }
    );
}

module.exports = { register };
