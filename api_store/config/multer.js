const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = path.basename(file.originalname, path.extname(file.originalname));        
        cb(null, fileName + '-'+ Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /\.(jpeg|jpg|png|webp)$/i; // Expresión regular para las extensiones de archivo

        const extname = path.extname(file.originalname).toLowerCase();
        const mimetype = file.mimetype.match(/^image\/(jpeg|jpg|png|webp)$/i);

        if (mimetype && fileTypes.test(extname)) {
            return cb(null, true); // Si es un archivo válido, lo dejamos pasar
        } else {
            const error = new Error('Solo se permite archivos JPEG, JPG o PNG');
            req.fileValidationError = error.message; // Guardamos el mensaje del error en el request
            return cb(error, false); // Enviamos el error a Multer para que lo maneje
        }
    }
});

module.exports = {upload};