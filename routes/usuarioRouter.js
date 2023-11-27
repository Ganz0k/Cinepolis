require("dotenv").config({ path: "../variables.env" });
const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuarioController");

router.get("/:nombre/:password", UsuarioController.iniciarSesion);

module.exports = router;