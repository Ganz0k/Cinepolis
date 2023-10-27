const express = require("express");
const router = express.Router();
const PeliculaController = require("../controllers/peliculaController");

router.post("/", PeliculaController.crearPelicula);
router.get("/:id", PeliculaController.obtenerPeliculaPorId);
router.put("/:id", PeliculaController.actualizarPelicula);
router.delete("/:id", PeliculaController.eliminarPelicula);
router.get("/:limit", PeliculaController.obtenerPeliculas);

module.exports = router;