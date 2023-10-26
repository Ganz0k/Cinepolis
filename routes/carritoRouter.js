const express = require("express");
const router = express.Router();
const CarritosController = require("../controllers/carritoController");

router.post("/", CarritosController.crearCarrito);
router.get("/:id", CarritosController.obtenerCarritoPorId);
router.put("/:id", CarritosController.actualizarCarrito);
router.get("/:id/boletos", CarritosController.obtenerBoletosPorIdCarrito);

module.exports = router;