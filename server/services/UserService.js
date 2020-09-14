const userRepository = require('../repository/UserRepo');
const { compareSync, hash } = require('bcrypt');

// Função assincrona que realiza o login e retorna um dicionario de resposta
// Valida usuário encontrado
// Valida senha
async function login({ email, password }) {
  return await userRepository
    .findByEmail(
      email
    )
    .then(function (user) {
      let passwordMatched = compareSync(password, user.password);

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
    })
    .catch((err) => {
      console.log(err);

      return {
        resp: false,
        code: 404,
        msg: 'Email ou senha incorreto',
        data: {},
      };
    });
}

// Função assincrona que registra um usuário e retorna um dicionario de resposta
// Valida usuário já cadastrado
async function registerUser({ name, email, password, birthday, city, uf }) {
  const hashedPassword = await hash(password, 8);

  return await userRepository
    .registerUser({
      name,
      email,
      password: hashedPassword,
      birthday,
      city,
      uf,
    })
    .then((user) => {
      return {
        resp: true,
        code: 201,
        msg: 'Usuário registrado',
        data: user,
      }
    })
    .catch(
      (err) => {
        console.log(err);

        return {
          resp: false,
          code: 401,
          msg: 'Erro: e-mail já cadastrado',
          data: {},
        };
      }
    );

}

module.exports = { login, registerUser };
