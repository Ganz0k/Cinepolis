const express = require("express");
const router = express.Router();
const ClienteController = require("../controllers/clienteController");

router.post("/", ClienteController.crearCliente);
router.get("/:nombre/:password", ClienteController.obtenerCliente);
router.put("/:id", ClienteController.actualizarCliente);
router.delete("/:id", ClienteController.eliminarCliente);

module.exports = router;