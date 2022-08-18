const { response } = require("express");
const Usuario = require("../models/User");
const Plantilla = require("../models/Plantillas");

const crearPlantilla = async (req, res = response) => {
  try {
    const page = new Plantilla(req.body);
    await page.save();

    return res.status(200).json({
      ok: true,
      page: page,
    });
  } catch {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "No se puedo crear la plantilla",
    });
  }
};

const actualizarPlantilla = async (req, res = response) => {
  try {
    const { id, page } = req.body;
    await Plantilla.updateOne({ _id: id }, { $set: page })
      .then((respuesta) => {
        res.send({ ok: true, respuesta });
        res.end();
      })
      .catch((err) => {
        res.send({
          ok: false,
          msg: "error en la actualizacion",
        });
        res.end();
      });
  } catch {
    console.log(error);
    return res.status(404).json({
      ok: false,
      msg: "No se pudo actualizar la plantilla",
    });
  }
};

const getPlantilla = async (req, res = response) => {
  try {
    const pages = await Plantilla.find();

    return res.status(200).json({
      ok: true,
      pages: pages,
    });
  } catch {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "No se pudo cargar las paginas",
    });
  }
};

module.exports = {
  crearPlantilla,
  actualizarPlantilla,
  getPlantilla,
};
