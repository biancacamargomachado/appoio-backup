const fs = require('fs');


function ImageHandler() {
}

ImageHandler.prototype._handleFile = function _handleFile(req, file, cb) {
    if (!('processed' in req.body)) {
        if ('userId' in req.body) {
            req.body.userId = parseInt(req.body.userId);
        }
        if ('appId' in req.body) {
            req.body.appId = parseInt(req.body.appId);
        }
        if ('tags' in req.body) {
            req.body.tags = JSON.parse(req.body.tags);
        }
        if ('steps' in req.body) {
            req.body.steps = JSON.parse(req.body.steps);
        }
        req.body.processed = true;
    }

    let path = './tmp/' + file.originalname;

    let outStream = fs.createWriteStream(path);
    file.stream.pipe(outStream);

    outStream.on('error', cb);
    outStream.on('finish',
        () => cb(null, {
            path: path
        })
    );

}

ImageHandler.prototype._removeFile = function _removeFile(req, file, cb) {
    if (file === undefined)
        return;

    fs.unlink(file.path, cb)
}

module.exports = new ImageHandler;
