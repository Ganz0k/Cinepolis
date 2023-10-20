const Boleto = require("../models/boleto");
const BoletoDAO = require("../dataAccess/boletoDAO");
const { AppError } = require("../utils/appError");

class BoletoController {
    
    static async crearBoleto(req, res, next) {
        try {
            const { idPelicula, idUsuario, asiento, horario, estado } = req.body;

            if (!idPelicula || !asiento || !horario || !estado) {
                next(new AppError("Los campos idPelicula, asiento, horario y estado son obligatorios", 500));
            }

            const boleto = new Boleto(undefined, idUsuario, asiento, horario, estado);
            const boletoRegistrado = await BoletoDAO.crearBoleto(idPelicula, boleto);

            res.status(200).json(boletoRegistrado);
        } catch (error) {
            next(new AppError("Error al crear el boleto", 500));
        }
    }

    static async obtenerBoletoPorId(req, res, next) {
        try {
            const idPelicula = req.params.idPelicula;
            const idBoleto = req.params.idBoleto;

            if (!idPelicula || !idBoleto) {
                next(new AppError("Los campos idPelicula y idBoleto son obligatorios", 500));
            }

            const boleto = await BoletoDAO.obtenerBoletoPorId(idPelicula, idBoleto);

            if (!boleto) {
                next(new AppError("No se encontró el boleto", 404));
            }

            res.status(200).json(boleto);
        } catch (error) {
            throw new AppError("No se logró obtener el boleto", 404);
        }
    }

    static async actualizarBoleto(req, res, next) {
        try {
            const idPelicula = req.params.idPelicula;
            const idBoleto = req.params.idBoleto;
            const { idUsuario, asiento, horario, estado } = req.body;

            if (!idPelicula || !idBoleto || !asiento || !horario || !estado) {
                next(new AppError("Los campos idPelicula, idBoleto, asiento, horario y estado son obligatorios", 500));
            }

            const boleto = new Boleto(idBoleto, idUsuario, asiento, horario, estado);
            const boletoActualizado = await BoletoDAO.actualizarBoleto(idPelicula, boleto._id, boleto);

            res.status(200).json(boletoActualizado);
        } catch (error) {
            next(new AppError("Error al actualizar el boleto", 500));
        }
    }

    static async obtenerBoletosPorPelicula(req, res, next) {
        try {
            const idPelicula = req.params.idPelicula;

            if (!idPelicula) {
                next(new AppError("El campo idPelicula es obligatorio", 500));
            }

            const boletos = await BoletoDAO.obtenerBoletosPorPelicula(idPelicula);

            if (!boletos) {
                next(new AppError("No se encontraron los boletos", 404));
            }

            res.status(200).json(boletos);
        } catch (error) {
            next(new AppError("No se lograron obtener los boletos", 404));
        }
    }
}

module.exports = BoletoController;