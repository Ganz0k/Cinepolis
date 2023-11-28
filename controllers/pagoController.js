const Pago = require("../models/pago");
const PagoDAO = require("../dataAccess/pagoDAO");
const { AppError } = require("../utils/appError");

class PagoController {

    static async crearPago(req, res, next) {
        try {
            const idCliente = req.cliente;
            const { monto, metodoPago, fechaPago, boletos } = req.body;

            if (!monto || !metodoPago || !fechaPago || !boletos) {
                return next(new AppError("Los campos monto, metodoPago, fechaPago y boletos son obligatorios", 500));
            }

            const pago = new Pago(undefined, monto, metodoPago, fechaPago, boletos);
            const pagoCreado = await PagoDAO.crearPago(idCliente, pago);

            res.status(200).json(pagoCreado);
        } catch (error) {
            next(new AppError("Error al crear el pago", 500));
        }
    }

    static async obtenerPagoPorId(req, res, next) {
        try {
            const idCliente = req.cliente;
            const idPago = req.params.idPago;

            if (!idPago) {
                return next(new AppError("El campo idPago es obligatorio", 500));
            }

            const pago = await PagoDAO.obtenerPagoPorId(idCliente, idPago);

            if (!pago) {
                return next(new AppError("No se pudo encontrar el pago", 404));
            }

            res.status(200).json(pago);
        } catch (error) {
            next(new AppError("No se pudo encontrar el pago", 404));
        }
    }

    static async obtenerPagosDeCliente(req, res, next) {
        try {
            const idCliente = req.cliente;
            const pagos = await PagoDAO.obtenerPagosDeCliente(idCliente);

            if (!pagos) {
                return next(new AppError("No se encontraron los pagos", 404));
            }

            res.status(200).json(pagos);
        } catch (error) {
            next(new AppError("No se pudieron encontrar los pagos", 404));
        }
    }
}

module.exports = PagoController;