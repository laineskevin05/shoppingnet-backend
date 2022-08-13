const multer = require('multer') 
const path = require ('path')

//Ajustes
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname + path.extname(file.originalname))
    }
});

module.exports = multer({storage});