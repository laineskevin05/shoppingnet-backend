const { response } = require("express");
const Pages = require("../models/UserPages");

const crearPagina = async (req, res = response) => {
  try {
    const page = new Pages(req.body);
    await page.save();

    return res.status(200).json({
      ok: true,
      page: page,
    });
  } catch {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "No se puedo crear la pagina",
    });
  }
};

const actualizarPagina = async (req, res = response) => {
  try {
    const { id, page } = req.body;
    await Pages.updateOne({ _id: id }, { $set: page })
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
      msg: "No se pudo actualizar la pagina",
    });
  }
};

module.exports = {
  crearPagina,
  actualizarPagina,
};
