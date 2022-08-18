const { Schema, model } = require("mongoose");
const plantillasSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    //nombre de la plantilla
    nombre: {
      type: String,
      required: true,
    },
    listHtml: {
      type: Array,
      required: true,
    },
    mostrarNavbar: {
      type: Boolean,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Plantillas", plantillasSchema);
