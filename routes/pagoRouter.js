const express = require("express");
const router = express.Router();
const PagoController = require("../controllers/pagoController");

router.post("/", PagoController.crearPago);
router.get("/:idCliente/:idPago", PagoController.obtenerPagoPorId);
router.get("/:idCliente", PagoController.obtenerPagosDeCliente);

module.exports = router;