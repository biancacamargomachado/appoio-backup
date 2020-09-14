const Tutorial = require('../models/Tutorial');
const Step = require('../models/Step');

async function registerTutorial({ userId, appId, appoioName, category, operationalSystem, operationalSystemVersion, steps }) {
    if (appId !== undefined) {
        if (operationalSystemVersion !== undefined) {
            return await Tutorial.create(
                {
                    userId: userId,
                    appId: appId,
                    appoioName: appoioName,
                    category: category,
                    appVersion: appVersion,
                    operatingSystem: operationalSystem,
                    operationalSystemVersion: operationalSystemVersion,
                    step: steps
                },
                {
                    include: [
                        {
                            model: Step,
                            as: 'steps'
                        }]
                }
            );
        }
        else {
            return await Tutorial.create(
                {
                    userId: userId,
                    appId: appId,
                    appoioName: appoioName,
                    category: category,
                    appVersion: appVersion,
                    operatingSystem: operationalSystem,
                    step: steps
                },
                {
                    include: [
                        {
                            model: Step,
                            as: 'steps'
                        }]
                }
            );
        }
    }
    else {
        if (operationalSystem !== undefined) {
            return await Tutorial.create(
                {
                    userId: userId,
                    appoioName: appoioName,
                    category: category,
                    operationalSystem: operationalSystem,
                    operationalSystemVersion: operationalSystemVersion,
                    step: steps
                },
                {
                    include: [
                        {
                            model: Step,
                            as: 'steps'
                        }]
                }
            );
        }
        else {
            return await Tutorial.create(
                {
                    userId: userId,
                    appoioName: appoioName,
                    category: category,
                    step: steps
                },
                {
                    include: [
                        {
                            model: Step,
                            as: 'steps'
                        }]
                }
            );
        }
    }
}

async function findByCategory({ category }) {
    return await Tutorial.findAll({
        where: category
    });
}

module.exports = { registerTutorial, findByCategory };
