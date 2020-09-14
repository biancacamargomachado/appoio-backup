const User = require('../models/User');

// Recupera do banco de dados um usuário que possua e-mail igual ao informado e retorna o objeto recuperado
async function findByEmail(email) {
  return await User.findOne({ where: { email } });
}

// Registra no banco de dados um usuário com nome, email e senha informados e retorna o objeto criado
async function registerUser({ name, email, password, birthday, city, uf }) {
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
