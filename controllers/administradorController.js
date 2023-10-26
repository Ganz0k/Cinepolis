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

            res.status(200).json(administradorRegistrado);
        } catch (error) {
            next(new AppError("Error al crear el administrador", 500));
        }
    }

    static async obtenerAdministrador(req, res, next) {
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

            // const accessToken = jwt.sign(administrador, process.env.ACCESS_TOKEN_SECRET);

            // res.status(200).json({ accessToken: accessToken });
            res.status(200).json(administrador);
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

            res.status(200).json(administradorActualizado);
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
}

module.exports = AdministradorController;