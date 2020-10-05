
const userAuth = function (req, res, next) {
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
        let adminErrorResp = res.json({
            resp: false,
            status: 403,
            msg: 'Usuário não possui direitos administrativos',
            data: {}
        });

        if (checkObj === undefined) {
            if (req.session.admin)
                return next(req, res);
            else
                return adminErrorResp;
        }
        else {
            for (const [key, value] of Object.entries(checkObj)) {
                if (req.body[key] === value) {
                    if (req.session.admin)
                        return next(req, res);
                    return adminErrorResp;
                }
            }
            return next(req, res);
        }
    }
}

module.exports = { userAuth, adminAuth };
