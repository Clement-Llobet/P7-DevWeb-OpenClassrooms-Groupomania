const multer = require('multer');

const MIME_TYPES: any = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req: Request, file: any, callback: (arg0: null, arg1: string) => void) => {
        callback(null, 'images')
    },
    filename: (req: Request, file: any, callback: (arg0: null, arg1: string) => void) => {
        const name = file.originalname.split('').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('image');