const fs = require('fs');
const cloudinary = require('cloudinary').v2;

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

    const uploadStream = cloudinary.uploader.upload_stream({
        use_filename: false,
        resource_type: "image",
        access_control: [{ access_type: "anonymous" }],
        discard_original_filename: true,
    }, (error, result) => {
        if (error) {
            cb(error);
            return;
        }

        cb(null, {
            originalName: file.originalname,
            publicId: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
        })
    })

    file.stream.pipe(uploadStream)

}

ImageHandler.prototype._removeFile = function _removeFile(req, file, cb) {
    if (file === undefined)
        return;

    fs.unlink(file.path, cb)
}

module.exports = new ImageHandler;
