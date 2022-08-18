const upload = require("../helpers/multer");
const { Router } = require("express");
const flieUpload = require("express-fileupload");
const router = Router();

const productoCtrl = require("../controllers/producto.controller");
const fileUpload = require("express-fileupload");
const { validarJWT } = require("../middlewares/validar-jwt");

router.get("/inventario/:id", validarJWT, productoCtrl.getProductos);

/* router.post('/', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    }), productoCtrl.crearProducto) */

router.post("/", validarJWT, productoCtrl.crearProducto);
router.get("/:id", productoCtrl.getProducto);
router.put("/:id", productoCtrl.editarProducto);
router.delete("/:id", validarJWT, productoCtrl.borrarProducto);

module.exports = router;
