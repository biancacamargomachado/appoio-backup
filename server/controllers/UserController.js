// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const userService = require('../services/UserService');

// Função assincrona que realiza o login e retorna um JSON de resposta
async function login(req, res) {
  const { email, password } = req.body;

  return await userService
    .login({
      email,
      password
    })
    .then(
      (user) => res.json(user)
    )
    .catch(
      function (err) {
        console.log(err);

        return {
          resp: false,
          status: 500,
          msg: 'Unkown error found on login: ' + err,
          data: {}
        }
      }
    );
}

// Função assincrona que realiza o regisgtro de um usuário e retorna um JSON de resposta
async function register(req, res) {
  const { name, email, password, birthday, city, uf } = req.body;

  return await userService
    .register({
      name,
      email,
      password,
      birthday,
      city,
      uf,
    })
    .then(
      (user) => res.json(user)
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

module.exports = { login, register };
