const Tag = require('../models/Tag.js');

async function registerTags({ tutorial, tags }) {
    let returnedTags = [];
    for (let i = 0; i < tags.length; i++) {
        returnedTags.push(await Tag.findOrCreate({
            where: {
                name: tags[i].name
            },
            defaults: {
                name: tags[i].name
            }
        }));
    }
    await Promise.all(returnedTags.map((tag) => tag.addTutorial(tutorial)));

    return returnedTags;
}

module.exports = { registerTags };
