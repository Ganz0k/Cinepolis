const express = require("express");
const router = express.Router();
const AdministradorController = require("../controllers/administradorController");

router.post("/", AdministradorController.crearAdministrador);
router.get("/:nombre/:password", AdministradorController.obtenerAdministrador);
router.put("/:id", AdministradorController.actualizarAdministrador);
router.delete("/:id", AdministradorController.eliminarAdministrador);

module.exports = router;