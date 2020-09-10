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
async function registerPassos({
    passos
}) {
    var promises = [];
    for (var i = 0; i < passos.length; i++) {

        promises.push(Passo.create({
            idPasso: DataTypes.INTEGER,
            idTutorial: DataTypes.INTEGER,
            descrição: DataTypes.VARCHAR,
            videoUrl: DataTypes.VARCHAR,
            imgUrl: DataTypes.VARCHAR
        }));
    }
    console.log(promises[0]);
    return await Promise.all(promises);
}
module.exports = {
    register,
    registerPassos
}


//routes>controller>services>repository>model