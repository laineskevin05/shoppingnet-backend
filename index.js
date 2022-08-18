const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./DB");
const fileUpload = require("express-fileupload")

// Crear el servidor de express
const app = express();

// Base de datos
connectDB();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

app.use(
  fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
  })
);

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/companies", require("./routes/companies"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/admin", require("./routes/administrador"));

// Escuchar peticiones
app.listen(process.env.PORT || 3500, () => {
  console.log(
    `Servidor corriendo en puerto ${process.env.PORT}`,
    app.settings.env
  );
});
