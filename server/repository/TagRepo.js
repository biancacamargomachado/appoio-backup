const Tag = require('../models/Tag');

// Recupera do banco de dados uma tag que possui nome igual ao informado e retorna o objeto recuperado
async function findByTag(name) {
  return await Tag.findOne({ where: { name } });
}

// Registra no banco de dados uma tag com nome informados e retorna o objeto criado
async function register({ name }) {
  return await Tag.create({
    name,
  });
}

module.exports = { register, findByTag };
