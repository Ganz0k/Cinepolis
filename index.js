const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { AppError, globalHandleError } = require("./utils/appError");
require("dotenv").config({ path: "./variables.env" });
const db = require("./config/db");
const cors = require("cors");

app.use(cors());

db.conectar();

app.use(bodyParser.json());
app.use(morgan("combined"));

const administradorRouter = require("./routes/administradorRouter");
const boletoRouter = require("./routes/boletoRouter");
const carritoRouter = require("./routes/carritoRouter");
const clienteRouter = require("./routes/clienteRouter");
const pagoRouter = require("./routes/pagoRouter");
const peliculaRouter = require("./routes/peliculaRouter");
const usuarioRouter = require("./routes/usuarioRouter");

app.use("/api/administradores", administradorRouter);
app.use("/api/boletos", boletoRouter);
app.use("/api/carritos", carritoRouter);
app.use("/api/clientes", clienteRouter);
app.use("/api/pagos", pagoRouter);
app.use("/api/peliculas", peliculaRouter);
app.use("/api/usuarios", usuarioRouter);

app.all("*", (req, res, next) => {
    next(new AppError("No se pudo acceder a la ruta especificada", 404));
});

app.use(globalHandleError);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor express escuchando en el puerto ${port}`);
});