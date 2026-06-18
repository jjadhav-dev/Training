const multer = require('multer');
const path = require('path');
const { validationError } = require('../utils/error');

const allowedMimeTypes = new Set([
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
]);

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
        return cb(new validationError('Only jpeg, jpg, png and webp files are allowed'));
    }

    cb(null, true);
};

const uploadProfileImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}).single('profile_url');

const handleProfileUpload = (req, res, next) => {
    uploadProfileImage(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            return next(new validationError(error.message));
        }

        if (error) {
            return next(error);
        }

        if (req.file) {
            req.file.extension = path.extname(req.file.originalname || '').toLowerCase();
        }

        next();
    });
};

module.exports = {
    handleProfileUpload
};
