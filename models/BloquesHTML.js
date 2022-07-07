const { Schema, model } = require("mongoose");

const bloquesHTMLSchema = new Schema(
  {
    autorId: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("BloquesHTML", bloquesHTMLSchema);
