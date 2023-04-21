import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 2621440 } }).single('image'); // 2621440 = 2,5MB

export default upload;