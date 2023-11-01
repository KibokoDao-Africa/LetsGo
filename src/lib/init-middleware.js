// lib/init-middleware.js
import multer from 'multer';

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize the multer middleware
const initMiddleware = initFn => (req, res) =>
  new Promise((resolve, reject) => {
    initFn(req, res, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });

export default initMiddleware(upload.single('image'));
