const { Schema, model } = require("mongoose");
// Las plantillas html sera una lista de bloques html que forman una
//sola pagina y pueden estar o no, personalizados (estilizados) por el administrador.

const plantillasHTMLSchema = new Schema(
  {
    autorId: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    listaHTML: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("PlantillasHTML", plantillasHTMLSchema);
