const tagRepository = require('../repository/TagRepo.js');

async function registerTags({ tutorial, tags }) {
  try {
    return await tagRepository.registerTags({ tutorial, tags });
  } catch (err) {
    throw err;
  }
}

module.exports = { registerTags };
