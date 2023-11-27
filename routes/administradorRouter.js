require("dotenv").config({ path: "../variables.env" });
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AdministradorController = require("../controllers/administradorController");

router.post("/", AdministradorController.crearAdministrador);
router.get("/", autentificarToken, AdministradorController.obtenerAdministrador);

function autentificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, administrador) => {
        if (err || administrador.rol !== "administrador") {
            return res.sendStatus(403);
        }

        req.administrador = administrador.idUsuario;
        next();
    });
}

module.exports = router;