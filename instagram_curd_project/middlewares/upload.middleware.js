const multer = require('multer');
const path = require('path');
const { validationError } = require('../utils/error');

const allowedMimeTypes = new Set([
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
]);

const allowedPostMimeTypes = new Set([
    ...allowedMimeTypes,
    'video/mp4',
    'video/quicktime',
    'video/webm'
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

const postFileFilter = (_req, file, cb) => {
    if (!allowedPostMimeTypes.has(file.mimetype)) {
        return cb(new validationError('Only jpeg, jpg, png, webp, mp4, mov and webm files are allowed'));
    }

    cb(null, true);
};

const uploadPostMedia = multer({
    storage,
    fileFilter: postFileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024
    }
}).single('url');

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

const handlePostUpload = (req, res, next) => {
    uploadPostMedia(req, res, (error) => {
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
    handleProfileUpload,
    handlePostUpload
};
