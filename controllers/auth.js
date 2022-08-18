const { response } = require("express");
const Usuario = require("../models/User");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { db } = require("../models/User");

const crearUsuario = async (req, res = response) => {
  const { email, nombre, password } = req.body;

  try {
    // Verificar el email
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese email",
      });
    }

    // Crear usuario con el modelo
    const dbUser = new Usuario(req.body);

    // Hashear la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // Generar el JWT
    const token = await generarJWT(dbUser.id, nombre);

    // Crear usuario de DB
    await dbUser.save();

    dbUser.password = undefined;

    // Generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      usuario: dbUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const dbUser = await Usuario.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "El correo no existe",
      });
    }

    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El password no es válido",
      });
    }

    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.nombre);

    dbUser.password = undefined;

    // Respuesta del servicio
    return res.json({
      ok: true,
      uid: dbUser.id,
      usuario: dbUser,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid } = req;

  // Leer la base de datos
  const dbUser = await Usuario.findById(uid);

  // Generar el JWT
  const token = await generarJWT(uid, dbUser.nombre);

  dbUser.password = undefined;

  return res.json({
    ok: true,
    uid,
    usuario: dbUser,
    token,
  });
};

const getUsuarios = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find();
    usuarios.forEach((user) => (user.password = undefined));

    return res.status(201).json({
      ok: true,
      usuarios: usuarios,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error obteniendo usuarios",
    });
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  getUsuarios,
};
