const Tutorial = require('../models/Tutorial');
const Step = require('../models/Step');
const Tag = require('../models/Tag');
const User = require('../models/User');

// Função que busca no banco um tutorial dado um ID e retorna em conjunto com seus passos, tags e usuário
async function findById(id) {
    return await Tutorial.findOne(
        {
            where: {
                id: id,
                // approved: 1
            },
            attributes: [
                'appoioName',
                'category',
                'appId',
                'appVersion',
                'operatingSystem',
                'operatingSystemVersion',
                ['createdAt', 'date']
            ],
            include: [
                {
                    model: Step,
                    as: 'steps',
                    attributes: [
                        'description',
                        'videoURL',
                        'imgURL'
                    ]
                },
                {
                    model: Tag,
                    as: 'tags',
                    attributes: [
                        'name'
                    ],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: [
                        'name',
                        'email'
                    ]
                }
            ]
        }
    );
}

// Função que retorna todos os tutoriais contendo ID, nome e categoria de cada
async function findAll() {
    return await Tutorial.findAll(
        {
            // where: {
            //     approved: 1
            // },
            attributes: [
                'id',
                'appoioName',
                'category'
            ]
        }
    );
}

// Função que registra um tutorial junto com seus passos para serem executados
async function registerTutorial(tutorialCreationObject) {
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
// Funcao que deleta um tutorial
async function deleteTutorial(id){
    const tutorial = await Tutorial.findOne(
    {
       where: {
           approved: 1,
           id: id 
       },
      attributes: ["id"],
    });
    await tutorial.destroy();
}

module.exports = { findById, findAll, registerTutorial, deleteTutorial };
