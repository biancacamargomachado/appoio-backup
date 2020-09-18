const User = require('../models/User');

// Recupera do banco de dados um usuário que possua e-mail igual ao informado e retorna o objeto recuperado
async function findByEmail(email) {
  return await User.findOne(
    {
      raw: true,
      attributes: [
        'password'
      ],
      where: {
        email: email
      }
    }
  );
}

// Registra no banco de dados um usuário com nome, email, senha, aniversario, cidade e uf informados e retorna o objeto criado
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
