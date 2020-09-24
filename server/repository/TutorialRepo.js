const Tutorial = require('../models/Tutorial');
const Step = require('../models/Step');
const Tag = require('../models/Tag');
const User = require('../models/User');


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


async function registerTutorial({ userId, appoioName, category, appId, appVersion, operatingSystem, operatingSystemVersion, steps, tags }) {
    let tutorial = await Tutorial.create(
        { userId, appoioName, category, appId, appVersion, operatingSystem, operatingSystemVersion, steps, approved: 0 },
        {
            include: [
                {
                    model: Step,
                    as: 'steps'
                }]
        }
    );

    let createdTags = await Tag.bulkCreate(
        tags,
        {
            fields: ['name']
        }
    );

    await tutorial.setTags(createdTags.map(tag => tag.id));
}


module.exports = { findById, findAll, registerTutorial };
