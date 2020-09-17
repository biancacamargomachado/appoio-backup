const Tutorial = require('../models/Tutorial');
const Step = require('../models/Step');
const Tag = require('../models/Tag');
const User = require('../models/User');

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
    return await Tutorial.findByPk(id,
        {
            include: [
                {
                    model: Step,
                    as: 'steps'
                },
                {
                    model: Tag,
                    as: 'tags'
                },
                {
                    model: User,
                    as: 'user'
                }
            ]
        }
    );
}

module.exports = { registerTutorial, findByCategory, findById };
