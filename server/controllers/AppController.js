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
            msg: 'All apps recovered',
            data: {
                apps: apps
            }
        })

    } catch (err) {
        console.log(err);

        return res.json({
            resp: false,
            status: 500,
            msg: 'Unkown error found on app getAll: ' + err,
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
            msg: 'Installed apps recovered',
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
            msg: 'Unkown error found on app get: ' + err,
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
            msg: 'App registered',
            data: {}
        });
    }
    catch (err) {
        console.log(err);

        return res.json({
            resp: false,
            status: 500,
            msg: 'Unkown error found on app registration: ' + err,
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
            msg: 'User apps updated',
            data: {}
        });

    } catch (err) {
        console.log(err);

        return res.json({
            resp: false,
            status: 500,
            msg: 'Unkown error found on app update: ' + err,
            data: {}
        });
    }
}


module.exports = { getAll, get, register, update };
