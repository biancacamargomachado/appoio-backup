/**
 * @author Fernanda Mello
 */

const Tutorial = require('../models/Tutorial');

async function findByCategory(category){
  return await Tutorial.findAll({ where: { category } });
}

module.exports = { findByCategory };