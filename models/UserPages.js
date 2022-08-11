const { Schema, model } = require("mongoose");
// solo es para el usuario empresa
const userPagesSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    //nombre de la pagina
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

module.exports = model("UserPages", userPagesSchema);
