const upload  = require('../helpers/multer')

const { Router } = require('express')
const router = Router();

const productoCtrl = require('../controllers/producto.controller')

router.get('/', productoCtrl.getProductos)
router.post('/', upload.single('image'), productoCtrl.crearProducto)
router.get('/:id', productoCtrl.getProducto)
router.put('/:id', productoCtrl.editarProducto)
router.delete('/:id', productoCtrl.borrarProducto)

module.exports = router