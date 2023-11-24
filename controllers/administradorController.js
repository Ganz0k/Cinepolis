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

    static async iniciarSesion(req, res, next) {
        try {
            const nombre = req.params.nombre;
            const password = req.params.password;

            if (!nombre || !password) {
                return next(new AppError("Los campos nombre y password son obligatorios", 500));
            }

            const administrador = await AdministradorDAO.obtenerAdministrador(nombre, password);

            if (!administrador) {
                return next(new AppError("No se encontró el administrador", 404));
            }

            const dataToSign = {
                idAdministrador: administrador._id,
                rol: administrador.rol
            };

            const accessToken = jwt.sign(dataToSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });

            res.status(200).json({ accessToken: accessToken });
        } catch (error) {
            next(new AppError("No se logró obtener el administrador", 404));   
        }
    }

    static async actualizarAdministrador(req, res, next) {
        try {
            const id = req.params.id;
            const { nombre, correoElectronico, password, rol, permisos } = req.body;

            if (!id || !nombre || !correoElectronico || !password || !rol || !permisos) {
                return next(new AppError("Los campos id, nombre, correoElectronico, password, rol y permisos son oligatorios", 500));
            }

            const expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            if (!expresionRegular.test(correoElectronico)) {
                return next(AppError("Correo inválido", 500));
            }

            const administrador = new Administrador(nombre, correoElectronico, password, rol, permisos);
            const administradorActualizado = await AdministradorDAO.actualizarAdministrador(id, administrador);

            const dataToSign = {
                idAdministrador: administradorActualizado._id,
                rol: administradorActualizado.rol
            };

            const accessToken = jwt.sign(dataToSign, process.enc.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });

            res.status(200).json({ accessToken: accessToken });
        } catch (error) {
            next(new AppError("Error al actualizar el administrador", 500));
        }
    }

    static async eliminarAdministrador(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                return next(new AppError("Faltan campos obligatorios", 500));
            }

            const administradorEliminado = await AdministradorDAO.eliminarAdministrador(id);

            if (!administradorEliminado) {
                return next(new AppError("No se encontró el administrador", 404));
            }

            res.status(200).json({ message: "Administrador eliminado correctamente" });
        } catch (error) {
            next(new AppError("Error al eliminar el administrador", 404));
        }
    }

    static async obtenerPermisosAdministrador(req, res, next) {
        try {
            let isAdministrador = false;

            if (req.administrador.rol === "administrador") {
                isAdministrador = true;
            }

            if (!isAdministrador) {
                return next(new AppError("No es administrador", 403));
            }

            const administrador = await AdministradorDAO.obtenerAdministradorPorId(req.administrador.idAdministrador);

            if (!administrador) {
                return next(new AppError("No se encontró el administrador", 404));
            }

            res.status(200).json({ permisos: administrador.permisos });
        } catch (error) {
            next(new AppError("Error al obtener el administrador", 404));
        }
    }
}

module.exports = AdministradorController;