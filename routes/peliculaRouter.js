require("dotenv").config({ path: "../variables.env" });
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const PeliculaController = require("../controllers/peliculaController");

router.post("/", autentificarToken, PeliculaController.crearPelicula);
router.get("/:id", PeliculaController.obtenerPeliculaPorId);
router.put("/:id", autentificarToken, PeliculaController.actualizarPelicula);
router.delete("/:id", autentificarToken, PeliculaController.eliminarPelicula);
router.get("/", PeliculaController.obtenerPeliculas);

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

        next();
    });
}

module.exports = router;