const userRepositoty = require('../repository/user');
const { compare, hash } = require('bcrypt');

// Função assincrona que realiza o login e retorna um dicionario de resposta
// Valida usuário encontrado
// Valida senha
async function login({ email, password }) {
  const user = await userRepositoty.findByEmail(email);

  if (!user)
    return {
      resp: false,
      code: 404,
      msg: 'Email ou senha incorreto',
      data: {},
    };

  const passwordMatched = await compare(password, user.password);

  if (!passwordMatched)
    return {
      resp: false,
      code: 403,
      msg: 'Email ou senha incorreto',
      data: {},
    };

  return {
    resp: true,
    code: 200,
    msg: 'Usuário logado',
    data: user,
  };
}

// Função assincrona que registra um usuário e retorna um dicionario de resposta
// Valida usuário já cadastrado
async function register({ name, email, password, birthday, city, uf }) {
  const chekcUserExists = await userRepositoty.findByEmail(email);

  if (chekcUserExists)
    return {
      resp: false,
      code: 401,
      msg: 'Erro: e-mail já cadastrado',
      data: {},
    };

  const hashedPassword = await hash(password, 8);

  const user = await userRepositoty.register({
    name,
    email,
    password: hashedPassword,
    birthday,
    city,
    uf,
  });

  return {
    resp: true,
    code: 201,
    msg: 'Usário registrado',
    data: user,
  };
}

module.exports = { login, register };
