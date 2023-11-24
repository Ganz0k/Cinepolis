require("dotenv").config({ path: "../variables.env" });
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AdministradorController = require("../controllers/administradorController");

router.post("/", AdministradorController.crearAdministrador);
router.get("/:nombre/:password", AdministradorController.iniciarSesion);
router.put("/:id", AdministradorController.actualizarAdministrador);
router.delete("/:id", AdministradorController.eliminarAdministrador);
router.get("/", autentificarToken, AdministradorController.obtenerPermisosAdministrador);

function autentificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, administrador) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.administrador = administrador;
        next();
    });
}

module.exports = router;