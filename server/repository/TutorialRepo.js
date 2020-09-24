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
            ],
            order: [
                ['createdAt', 'DESC']
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
            fields: ['name'],
            ignoreDuplicates: true
        }
    );

    for (let i = 0; i < createdTags.length; i++) {
        let tagId = createdTags[i].id;
        let tagName = createdTags[i].name;

        if (tagId)
            createdTags[i] = tagId;
        else
            createdTags[i] = (await Tag.findOne({ where: { name: tagName } })).id;
    }

    await tutorial.setTags(createdTags);
}


module.exports = { findById, findAll, registerTutorial };
