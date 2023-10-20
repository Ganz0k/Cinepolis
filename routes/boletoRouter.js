const express = require("express");
const router = express.Router();
const BoletosController = require("../controllers/boletoController");

router.post("/boletos", BoletosController.crearBoleto);
router.get("/boletos/:idPelicula/:idBoleto", BoletosController.obtenerBoletoPorId);
router.put("/boletos/:idPelicula/:idBoleto", BoletosController.actualizarBoleto);
router.get("/boletos/:idPelicula", BoletosController.obtenerBoletosPorPelicula);

module.exports = router;