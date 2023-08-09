import multer from "multer";
import crypto from 'crypto';

export const generateRandomDigits = (num: number): number =>
  Math.floor(Math.random() * (9 * 10 ** (num - 1))) + 10 ** (num - 1);

export const generateRandomDocumentName = (bytes = 32):string =>
  crypto.randomBytes(bytes).toString('hex');

export const fileUploadMiddleware = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG images allowed'));
    }
  }
});