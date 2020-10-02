const express = require('express');
const userRoute = require('./UserRoute');
const tutorialRoute = require('./TutorialRoute');
const appRoute = require('./AppRoute');

const router = express.Router();


const userAuth = function (req, res, next) {
    console.log(next);
    if (req.session.userId !== undefined)
        return next(req, res);

    return res.json({
        resp: false,
        status: 401,
        msg: 'Usuário não realizou login',
        data: {}
    });
}

const adminAuth = function (checkObj) {
    return function (req, res, next) {
        let adminError = res.json({
            resp: false,
            status: 403,
            msg: 'Usuário não possui direitos administrativos',
            data: {}
        });

        if (checkObj === undefined) {
            if (req.session.admin)
                return next(req, res);
            else
                return adminError;
        }
        else {
            for (const [key, value] of Object.entries(checkObj)) {
                if (req.body[key] === value) {
                    if (req.session.admin)
                        return next(req, res);
                    return adminError;
                }
            }
            return next(req, res);
        }
    }
}

router.use('/user', userRoute());
router.use('/app', appRoute(userAuth));
router.use('/tutorial', tutorialRoute(userAuth, adminAuth));


module.exports = router;
