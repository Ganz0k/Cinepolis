const express = require("express");
const router = express.Router();
const CarritosController = require("../controllers/carritoController");

router.post("/carritos", CarritosController.crearCarrito);
router.get("/carritos/:id", CarritosController.obtenerCarritoPorId);
router.put("/carritos/:id", CarritosController.actualizarCarrito);
router.get("/carritos/:id", CarritosController.obtenerBoletosPorIdCarrito);

module.exports = router;