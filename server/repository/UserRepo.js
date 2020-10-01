const User = require('../models/User');

/*
 * Função que busca a senha e id de um usuário dado o email
 * 
 * @example
 *     findByEmail(meuemail@gmail.com); // User(email:meuemail@gmail.com).password e User(email:meuemail@gmail.com).id
 * 
 * @param {email}  obrigatório email do usuário cujos dados se deseja buscar
 * 
 * @returns {User.password, User.id}
 * 
 */
async function findByEmail(email) {
  return await User.findOne(
    {
      attributes: [
        'password',
        'id'
      ],
      where: {
        email: email
      }
    }
  );
}

/*
 * Função que cria um registro de um novo usuário a partir dos dados informados
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
  return await User.create({
    name,
    email,
    password,
    birthday,
    city,
    uf,
  });
}

module.exports = { registerUser, findByEmail };
