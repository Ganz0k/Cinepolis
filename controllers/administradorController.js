require("dotenv").config({ path: "../variables.env" });
const Administrador = require("../models/administrador");
const AdministradorDAO = require("../dataAccess/administradorDAO");
const { AppError } = require("../utils/appError");
const jwt = require("jsonwebtoken");

class AdministradorController {
    
    static async crearAdministrador(req, res, next) {
        try {
            const { nombre, correoElectronico, password, permisos } = req.body;

            if (!nombre || !correoElectronico || !password || !permisos) {
                return next(new AppError("Los campos nombre, correo electrónico, password, y permisos son obligatorios", 500));
            }

            const expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            if (!expresionRegular.test(correoElectronico)) {
                return next(new AppError("Correo inválido", 500));
            }

            const administrador = new Administrador(nombre, correoElectronico, password, undefined, permisos);
            const administradorRegistrado = await AdministradorDAO.crearAdministrador(administrador);

            const dataToSign = {
                idAdministrador: administradorRegistrado._id,
                rol: administradorRegistrado.rol
            };

            const accessToken = jwt.sign(dataToSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });

            res.status(200).json({ accessToken: accessToken });
        } catch (error) {
            next(new AppError("Error al crear el administrador", 500));
        }
    }

    static async obtenerAdministrador(req, res, next) {
        try {
            const administrador = await AdministradorDAO.obtenerAdministradorPorId(req.administrador);

            if (!administrador) {
                return next(new AppError("No se encontró el administrador", 404));
            }

            res.status(200).json(administrador);
        } catch (error) {
            next(new AppError("Error al obtener el administrador", 404));
        }
    }
}

module.exports = AdministradorController;