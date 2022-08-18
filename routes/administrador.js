const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuarios } = require("../controllers/auth");
const {
  crearPlantilla,
  actualizarPlantilla,
  getPlantilla,
} = require("../controllers/admin.controller");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/usuarios", validarJWT, getUsuarios);

router.post("/plantilla/new", validarJWT, crearPlantilla);

router.post("/plantilla/update/", validarJWT, actualizarPlantilla);

router.get("/plantillas", getPlantilla);

module.exports = router;
