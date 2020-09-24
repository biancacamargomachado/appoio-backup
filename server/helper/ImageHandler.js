const fs = require('fs');
const cloudinary = require('cloudinary').v2;

function ImageHandler() {
}

ImageHandler.prototype._handleFile = function _handleFile(req, file, cb) {
    const uploadStream = cloudinary.uploader.upload_stream(
        {
            use_filename: false,
            resource_type: "image",
            access_control: [{ access_type: "anonymous" }],
            discard_original_filename: true,
        },
        (error, result) => {
            if (error) {
                cb(error);
            }

            cb(null, {
                originalName: file.originalname,
                publicId: result.public_id,
                url: result.url,
                secureURL: result.secure_url,
            })
        })

    file.stream.pipe(uploadStream)
}

ImageHandler.prototype._removeFile = function _removeFile(req, file, cb) {
    if (file)
        fs.unlink(file.path, cb)
}

module.exports = new ImageHandler;
