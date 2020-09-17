var fs = require('fs');


function ImageHandler() {
}

ImageHandler.prototype._handleFile = function _handleFile(req, file, cb) {
    console.log("\n\nSalvando arquivo");

    var path = './tmp/';

    var outStream = fs.createWriteStream(path + file.originalname);

    file.stream.pipe(outStream);
    outStream.on('error', cb);
    outStream.on('finish', function () {
        cb(null, {
            path: this.path,
            size: outStream.bytesWritten
        });
    });
}

ImageHandler.prototype._removeFile = function _removeFile(req, file, cb) {
    console.log("\n\nExcluindo arquivo\n\n");
    fs.unlink(file.path, cb)
}

module.exports = new ImageHandler;
