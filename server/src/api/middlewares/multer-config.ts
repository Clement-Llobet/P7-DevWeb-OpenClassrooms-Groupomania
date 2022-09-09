const multer = require("multer") ;
import { Multer } from "multer";
import path from "path";
type File = Express.Multer.File;

const MIME_TYPES: any = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req: Request, file: File, callback: any) => {
        callback(null, path.join(__dirname, '../images'))
    },
    filename: (req: Request, file: File, callback: any) => {
        const name = file.originalname.split(/\s|\./).join('_'); 
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('profilePicture' || 'urlImage');