const express = require("express");
const router = express.Router();
const CarritosController = require("../controllers/carritoController");

router.post("/", autentificarToken, CarritosController.crearCarrito);
router.get("/:id", autentificarToken, CarritosController.obtenerCarritoPorId);
router.put("/:id", autentificarToken, CarritosController.actualizarCarrito);
router.get("/:id/boletos", autentificarToken, CarritosController.obtenerBoletosPorIdCarrito);

function autentificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, cliente) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.cliente = cliente;
        next();
    });
}

module.exports = router;