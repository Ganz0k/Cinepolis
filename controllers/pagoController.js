const Pago = require("../models/pago");
const PagoDAO = require("../dataAccess/pagoDAO");
const { AppError } = require("../utils/appError");

class PagoController {

    static async crearPago(req, res, next) {
        try {
            const { idCliente, monto, metodoPago, fechaPago, boletos } = req.body;

            if (!idCliente || !monto || !metodoPago || !fechaPago || !boletos) {
                next(new AppError("Los campos idCliente, monto, metodoPago, fechaPago y boletos son obligatorios", 500));
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
            const idCliente = req.params.idCliente;
            const idPago = req.params.idPago;

            if (!idCliente || !idPago) {
                next(new AppError("Los campos idCliente y idPago son obligatorios", 500));
            }

            const pago = await PagoDAO.obtenerPagoPorId(idCliente, idPago);

            if (!pago) {
                next(new AppError("No se pudo encontrar el pago", 404));
            }

            res.status(200).json(pago);
        } catch (error) {
            next(new AppError("No se pudo encontrar el pago", 404));
        }
    }

    static async obtenerPagosDeCliente(req, res, next) {
        try {
            const idCliente = req.params.idCliente;

            if (!idCliente) {
                next(new AppError("El campo idCliente es obligatorio", 500));
            }

            const pagos = await PagoDAO.obtenerPagosDeCliente(idCliente);

            if (!pagos) {
                next(new AppError("No se encontraron los pagos", 404));
            }

            res.status(200).json(pagos);
        } catch (error) {
            next(new AppError("No se pudieron encontrar los pagos", 404));
        }
    }
}

module.exports = PagoController;