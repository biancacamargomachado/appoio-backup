const userRepository = require('../repository/UserRepo');
const { compare, hash } = require('bcrypt');
const User = require('../models/User');
const admEmail = require('../config/env').admEmail;

/*
 * Função que realiza o login do usuário dado seu email e senha, buscando o usuário e 
 * registrando seu id na sessão, caso os dados sejam válidos.
 * 
 * @param {email}  obrigatório o email do usuário cadastrado
 * @param {password}  obrigatória a senha do usuário cadastrado
 * 
 * @returns {User.id, User.adm}
 * 
 */
async function login(email, password) {
  try {
    let user = (await userRepository.findByEmail(email)).toJSON();

    let match = await compare(password, user.password);
    if (!match)
      throw Error('password does not match');

    delete user.password;
    if (email === admEmail)
      user.adm = true;
    else
      user.adm = false;

    return user;

  } catch (err) {
    throw err;
  }
}

/*
 * Função que registra um novo usuário a partir dos dados informados, após criptografar a senha
 * 
 * @param {name} obrigatório o nome do usuário a ser criado
 * @param {email} obrigatório o email do usuário a ser criado
 * @param {password} obrigatória a senha do usuário a ser criado
 * @param {birthday} obrigtória a data de nascimento do usuário a ser criado
 * @param {city} obrigatória a cidade do usuário a ser criado
 * @param {uf} obrigatório a unidade federativa do usuário a ser criado
 * 
 * @returns {}
 * 
 */
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
