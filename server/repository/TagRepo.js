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

    await returnedTags.forEach((tag) => addTags(tag, tutorial) );

    return returnedTags;
}

async function addTags(tag, tutorial){
    await tutorial.addTags(tag[0]);
}

module.exports = { registerTags };
