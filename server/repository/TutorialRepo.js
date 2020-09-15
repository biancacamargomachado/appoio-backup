const Tutorial = require('../models/Tutorial');
const Step = require('../models/Step');

async function registerTutorial( tutorialCreationObject ) {
    Object
        .keys(tutorialCreationObject)
        .forEach(
            key => tutorialCreationObject[key] === undefined ? delete tutorialCreationObject[key] : {}
        );
    return await Tutorial.create(
        tutorialCreationObject,
        {
            include: [
                {
                    model: Step,
                    as: 'steps'
                }]
        }
    );
}

async function findByCategory({ category }) {
    return await Tutorial.findAll({
        where: category
    });
}

async function findById(id){
    return await Tutorial.findByPk(id);
}

module.exports = { registerTutorial, findByCategory, findById };
