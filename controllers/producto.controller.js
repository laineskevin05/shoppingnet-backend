const fs = require ('fs-extra')
const path = require ('path') 

const productoCtrl = {}
const Producto = require('../models/productos')

//Obtener todos los productos
productoCtrl.getProductos = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
}

//Crear un producto nuevo
productoCtrl.crearProducto = async (req, res) => {
    const {nombre, categoria, stock, precio, empresa,descripcion} =  req.body
    const nuevoProducto = {nombre, categoria, stock, precio, empresa, descripcion, imagen: req.file.path}
    const producto = new Producto(nuevoProducto)
 /*    const nuevoProducto = new Producto(req.body) */
    console.log(nuevoProducto);
    await producto.save()
    res.send({message: 'Producto creado'})
}

//Obtener solo un producto 
productoCtrl.getProducto = async (req, res) => {
    console.log(req.params)
    const producto = await Producto.findById(req.params.id)
    res.send(producto)
}

//Editar un producto
productoCtrl.editarProducto = async (req, res) => {
    const {id } = req.params
    const {nombre, categoria, stock, precio, empresa, descripcion} =  req.body
    
    /* const producto = await Producto.findByIdAndUpdate(req.params.id, {
        nombre, categoria, stock, precio, empresa, descripcion, imagen: req.file.path
    }) */
    console.log(req.body)
    await Producto.findByIdAndUpdate(id, {$set: req.body}, {new: true})
    res.json({status: "Producto actualizado"})
}

//Eliminar un producto
productoCtrl.borrarProducto = async (req, res) => {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id)
    if(productoEliminado){
        await fs.unlink(path.resolve(productoEliminado.imagen));
    }
    res.json({status: 'Producto eliminado'})
}

module.exports = productoCtrl;