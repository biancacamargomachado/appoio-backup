const Tag = require('../models/Tag.js');

async function registerTags(tutorial, tags) {
    let promiseTags = [];
    for (let i = 0; i < tags.length; i++) {
        promiseTags.push(Tag.findOrCreate({
            where: {
                name: tags[i].name
            },
            defaults: {
                name: tags[i].name
            }
        }));
    }

    let registeredTags = await Promise.all(promiseTags);
    await Promise.all(registeredTags.map(tag => tutorial.addTags(tag[0])));

    return registeredTags;
}

module.exports = { registerTags };
