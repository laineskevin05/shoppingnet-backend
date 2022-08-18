const {Schema, model} = require('mongoose');

const productoSchema = new Schema({
    nombre: {type: String, required: true},
    categoria: {type: String, required: true},
    imagen: {public_id: String, secure_url: String }, 
    stock: {type: String, required: true},
    precio: {type: String, required: true},
    usuario: {type: String, required: false},
    descripcion: {type: String},
})

module.exports = model('Producto', productoSchema)