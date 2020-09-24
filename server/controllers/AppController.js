const appService = require('../services/AppService');


async function getAll(req, res) {
    let userId = req.session.userId;
    if (userId === undefined)
        return res.json({
            resp: false,
            status: 401,
            msg: 'User not logged',
            data: {}
        });

    try {
        let apps = await appService.getAll(userId);

        return res.json({
            resp: true,
            status: 200,
            msg: 'Tutorial recovered',
            data: {
                apps: apps
            }
        })

    } catch (err) {
        console.log(err);

        return res.json({
            resp: false,
            status: 500,
            msg: 'Unkown error found on get: ' + err,
            data: {}
        });
    }
}


async function get(req, res) {
    let userId = req.session.userId;
    if (userId === undefined)
        return res.json({
            resp: false,
            status: 401,
            msg: 'User not logged',
            data: {}
        });

    try {
        let apps = await appService.get(userId);

        return res.json({
            resp: true,
            status: 200,
            msg: 'Tutorials recovered',
            data: {
                apps: apps
            }
        });
    }
    catch (err) {
        console.log(err);

        return res.json({
            resp: false,
            status: 500,
            msg: 'Unkown error found on getAll: ' + err,
            data: {}
        });
    }
}

async function register(req, res) {
    let userId = req.session.userId;

    if (userId === undefined)
        return res.json({
            resp: false,
            status: 401,
            msg: 'User not logged',
            data: {}
        });

    try {
        let { appNames } = req.body;

        await appService.register(userId, appNames);

        return res.json({
            resp: true,
            status: 201,
            msg: 'Tutorials recovered',
            data: {}
        });
    }
    catch (err) {
        console.log(err);

        return res.json({
            resp: false,
            status: 500,
            msg: 'Unkown error found on getAll: ' + err,
            data: {}
        });
    }

}


async function update(req, res) {
    let userId = req.session.userId;

    if (userId === undefined)
        return res.json({
            resp: false,
            status: 401,
            msg: 'User not logged',
            data: {}
        });


    try {
        let { appNames } = req.body;
        await appService.update(userId, appNames);

        return res.json({
            resp: true,
            status: 201,
            msg: 'Tutorial registered',
            data: {}
        });

    } catch (err) {
        console.log(err);

        return res.json({
            resp: false,
            status: 500,
            msg: 'Unkown error found on registration: ' + err,
            data: {}
        });
    }
}


module.exports = { getAll, get, register, update };
