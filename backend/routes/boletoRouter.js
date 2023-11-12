const express = require("express");
const router = express.Router();
const BoletosController = require("../controllers/boletoController");

router.post("/", BoletosController.crearBoleto);
router.get("/:idPelicula/:idBoleto", BoletosController.obtenerBoletoPorId);
router.put("/:idPelicula/:idBoleto", BoletosController.actualizarBoleto);
router.get("/:idPelicula", BoletosController.obtenerBoletosPorPelicula);

module.exports = router;