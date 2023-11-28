require("dotenv").config({ path: "../variables.env" });
const express = require("express");
const router = express.Router();
const PagoController = require("../controllers/pagoController");
const jwt = require("jsonwebtoken");

router.post("/", autentificarToken, PagoController.crearPago);
router.get("/:idPago", autentificarToken, PagoController.obtenerPagoPorId);
router.get("/", autentificarToken, PagoController.obtenerPagosDeCliente);

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