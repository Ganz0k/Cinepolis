require("dotenv").config({ path: "../variables.env" });
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ClienteController = require("../controllers/clienteController");

router.post("/", ClienteController.crearCliente);
router.put("/", autentificarToken, ClienteController.actualizarCliente);
router.get("/", autentificarToken, ClienteController.obtenerCliente);

function autentificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, cliente) => {
        if (err || cliente.rol !== "cliente") {
            return res.sendStatus(403);
        }

        req.cliente = cliente.idUsuario;
        next();
    });
}

module.exports = router;