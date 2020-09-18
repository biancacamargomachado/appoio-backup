const userRepository = require('../repository/UserRepo');
const { compare, hash } = require('bcrypt');

// Função assincrona que realiza o login e retorna um dicionario de resposta
// Valida usuário encontrado
// Valida senha
async function login(email, password) {
  try {
    let user = await userRepository
      .findByEmail(
        email
      );

    let match = await compare(password, user.password);
    if (!match)
      throw Error('password does not match');

    return user;

  } catch (err) {
    throw err;
  }
}

// Função assincrona que registra um usuário e retorna um dicionario de resposta
// Valida usuário já cadastrado
async function registerUser(name, email, password, birthday, city, uf) {
  try {

    let hashedPassword = await hash(password, 8);

    return await userRepository.registerUser(
      name,
      email,
      hashedPassword,
      birthday,
      city,
      uf,
    );

  } catch (err) {
    throw err;
  }
}

module.exports = { login, registerUser };
