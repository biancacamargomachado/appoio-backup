const Tutorial = require ('../models/Tutorial');

async function register({nomeApoio, categoria, OS, versaoOS, tags}) {
    return await Tutorial.create({
        nomeApoio, 
        categoria, 
        OS, 
        versaoOS, 
        });}
module.exports = {register}

//routes>controller>services>repository>model