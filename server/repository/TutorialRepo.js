const Tutorial = require('../models/Tutorial');
const Passo = require('../models/Passo');

async function register({
    nomeApoio,
    categoria,
    OS,
    versaoOS,
    tags
}) {
    return await Tutorial.create({
        nomeApoio,
        categoria,
        OS,
        versaoOS,
    });
}

async function registerPassos({ passos }) {
    var promises = [];
    for (var i = 0; i < passos.length; i++) {
        promises.push(Passo.create({
            idPasso: DataTypes.INTEGER, 
            idTutorial: DataTypes.INTEGER, 
            descricao: DataTypes.STRING, 
            videoUrl: DataTypes.STRING, 
            imgUrl: DataTypes.STRING
        }));
    }
    
    return await Promise.all(promises);
}



async function findByCategory(category){
  return await Tutorial.findAll({ where: { category } });
}

module.exports = { register, registerPassos, findByCategory };
