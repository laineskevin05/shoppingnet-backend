const cloudinary =  require ('cloudinary')

cloudinary.config({
    cloud_name: "dbxci91ws",
    api_key: "322453993253633",
    api_secret: "Urrf1FolW1rhLM7sufgG2NmSYYg",
    upload_preset: "angular_cloudinary",
    secure: true
})


  
const deleteImage = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id,  function(error,result) {
        console.log(result, error) })
}

module.exports =  deleteImage; 