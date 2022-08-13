const {Schema, model} = require('mongoose');

const productoSchema = new Schema({
    nombre: {type: String, required: true},
    categoria: {type: String, required: true},
    imagen: {type: String, required: true},
    stock: {type: Number, required: true},
    precio: {type: Number, required: true},
    empresa: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    descripcion: {type: String, required: false},

})

module.exports = model('Producto', productoSchema)