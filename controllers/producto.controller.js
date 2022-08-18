const fs = require ('fs-extra')
const path = require ('path') 
const uploadImage = require('../helpers/cloudinary')
const deleteImage = require('../helpers/cloudinary2')

const productoCtrl = {}
const Producto = require('../models/productos')

//Obtener productos de un vendedor 
productoCtrl.getProductos = async (req, res) => {
    console.log(req.params)
    const producto = await Producto.find({usuario: req.params.id})
    res.json(producto)
}

//Obtener todos los productos
/* productoCtrl.getProductos = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
} */

//Crear un producto nuevo
productoCtrl.crearProducto = async (req, res) => {
    

    try {
        const {nombre, categoria, stock, precio,descripcion, usuario} =  req.body
        console.log(req.body)

        const nuevoProducto = new Producto({
            nombre, 
            categoria, 
            stock, 
            precio, 
            descripcion,
            usuario
        })

        if(req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            nuevoProducto.imagen = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.image.tempFilePath)
        }
        console.log(req.files.image)

        await nuevoProducto.save()
        res.json(nuevoProducto)
        console.log(nuevoProducto)
    } catch (error){
        return res.status(500).json({ message: error.message})
    }
}


//Obtener solo un producto 
productoCtrl.getProducto = async (req, res) => {
    console.log(req.params)
    const producto = await Producto.findById(req.params.id)
    res.send(producto)
}

//Editar un producto


productoCtrl.editarProducto = async (req, res) => {
    
    const {id} = req.params;
    const {nombre, categoria, stock, precio, descripcion } = req.body;
    let publicId = ''
    let secureUrl = ''

    if(req.files?.image) {
        const productoEncontrado = await Producto.findById(id)
        const result = deleteImage(productoEncontrado.imagen.public_id)
        await result
        const result2 = await uploadImage(req.files.image.tempFilePath)
        
        publicId = result2.public_id;
        secureUrl = result2.secure_url;
        
        
        await fs.unlink(req.files.image.tempFilePath)
    }

    const updateProducto = await Producto.findByIdAndUpdate(id, {
        nombre, categoria, stock, precio, descripcion, "imagen.public_id":publicId, "imagen.secure_url": secureUrl
    })

    return res.json({
        message: 'Successfully updated',
        updateProducto
    });
}


//Eliminar un producto


productoCtrl.borrarProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id)

        if(!productoEliminado){
            message: 'El producto no existe'
        }

        const result = deleteImage(productoEliminado.imagen.public_id)
        await result
        console.log(result)
        return res.json(productoEliminado)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
    
}

module.exports = productoCtrl;