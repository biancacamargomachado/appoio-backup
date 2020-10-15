
const userAuth = async function (req, res, next) {
    if (req.session.userId !== undefined) {
        return await next();
    }

    return res.json({
        result: false,
        status: 401,
        msg: 'Usuário não realizou login',
        data: {}
    });
}



const adminAuth = function (checkObj) {
    return async function (req, res, next) {
        let adminErrorResp = {
            result: false,
            status: 403,
            msg: 'Usuário não possui direitos administrativos',
            data: {}
        };

        if (checkObj === undefined) {
            if (req.session.admin)
                return await next();
            else
                return res.json(adminErrorResp);
        }
        else {
            for (let [key, obj] of Object.entries(checkObj)) {
                for (let [objKey, objVal] of Object.entries(obj)) {
                    if (req[key][objKey] === objVal) {
                        if (!req.session.admin) {
                            return res.json(adminErrorResp);
                        }
                    }
                }
            }
            return await next();
        }
    }
}

module.exports = { userAuth, adminAuth };
