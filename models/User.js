const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    //tipos: administrador, empresa, cliente
    tipoUsuario: {
      type: String,
      required: true,
    },
    //nombre es obligatorio para los tres tipos de usuario
    //nombre tambien se refiere al nombre de la empresa
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Provide a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    telefono: {
      type: String,
      required: false,
    },
    direccion: {
      type: String,
      required: false,
    },
    //solo para el usuario empresa
    tipoNegocio: {
      type: String,
      required: false,
    },
    //solo para el usuario empresa
    descripcion: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
