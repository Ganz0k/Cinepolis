require("dotenv").config({ path: "../variables.env" });
const UsuarioDAO = require("../dataAccess/usuarioDAO");
const { AppError } = require("../utils/appError");
const jwt = require("jsonwebtoken");

class UsuarioController {

    static async iniciarSesion(req, res, next) {
        try {
            const nombre = req.params.nombre;
            const password = req.params.password;

            if (!nombre || !password) {
                return next(new AppError("Los campos nombre y password son obligatorios", 500));
            }

            const usuario = await UsuarioDAO.obtenerUsuario(nombre, password);

            if (!usuario) {
                return next(new AppError("No se encontró el usuario", 404));
            }

            const dataToSign = {
                idUsuario: usuario._id,
                rol: usuario.rol
            }

            const accessToken = jwt.sign(dataToSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });

            res.status(200).json({ accessToken: accessToken });
        } catch (error) {
            next(new AppError("No se pudo encontrar el usuario", 404));
        }
    }
}

module.exports = UsuarioController;