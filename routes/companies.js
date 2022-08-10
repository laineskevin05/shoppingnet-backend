const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearPagina,
  actualizarPagina,
} = require("../controllers/pages.controller");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post("/page/new", validarJWT, crearPagina);

router.post("/page/update/", validarJWT, actualizarPagina);

module.exports = router;
