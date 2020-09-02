// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const UserService = require('../services/User');

// Função assincrona que realiza o login e retorna um JSON de resposta
async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserService.login({ email, password });

  return res.json(user);
}

// Função assincrona que realiza o regisgtro de um usuário e retorna um JSON de resposta
async function register(req, res) {
  const { name, email, password, birthday, city, uf } = req.body;

  const user = await UserService.register({
    name,
    email,
    password,
    birthday,
    city,
    uf,
  });

  return res.json(user);
}

module.exports = { login, register };
