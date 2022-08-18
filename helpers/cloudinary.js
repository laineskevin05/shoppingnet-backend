const cloudinary =  require ('cloudinary')

cloudinary.config({
    cloud_name: "dbxci91ws",
    api_key: "322453993253633",
    api_secret: "Urrf1FolW1rhLM7sufgG2NmSYYg",
    upload_preset: "angular_cloudinary",
    secure: true
})

const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
      folder: 'upload'/* , resource_type:'auto' */
    })
  }
  
const deleteImage = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id,  function(error,result) {
        console.log(result, error) })
}

  
module.exports = uploadImage;




/* const multer = require('multer') 
const path = require ('path')

//Ajustes
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname + path.extname(file.originalname))
    }
});

module.exports = multer({storage}); */