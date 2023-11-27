const Carrito = require("../models/carrito");
const CarritoDAO = require("../dataAccess/carritoDAO");
const { AppError } = require("../utils/appError");

class CarritoController {

    static async crearCarrito(req, res, next) {
        try {
            const idUsuario = req.cliente;
            const carrito = new Carrito(idUsuario, []);
            const carritoCreado = await CarritoDAO.crearCarrito(carrito);

            res.status(200).json(carritoCreado);
        } catch (error) {
            next(new AppError("Error al crear el carrito", 500));
            console.log(error);
        }
    }

    static async obtenerCarritoPorId(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                return next(new AppError("El campo id es obligatorio", 500));
            }

            const carrito = await CarritoDAO.obtenerCarritoPorId(id);

            if (!carrito) {
                return next(new AppError("No se encontró el carrito", 404));
            }

            res.status(200).json(carrito);
        } catch (error) {
            next(new AppError("No se logró econtrar el carrito", 404));
        }
    }

    static async actualizarCarrito(req, res, next) {
        try {
            const idUsuario = req.cliente;
            const id = req.params.id
            const boletos = req.body;

            if (!id || !boletos) {
                return next(new AppError("Los campos id y boletos son obligatorios", 500));
            }

            const carrito = new Carrito(idUsuario, boletos);
            const carritoActualizado = await CarritoDAO.actualizarCarrito(id, carrito);

            res.status(200).json(carritoActualizado);
        } catch (error) {
            return next(new AppError("Error al actualizar el carrito", 500));
        }
    }

    static async obtenerBoletosPorIdCarrito(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                return next(new AppError("El campo id es obligatorio", 500));
            }

            const boletos = await CarritoDAO.obtenerBoletosPorIdCarrito(id);

            if (!boletos) {
                return next(new AppError("No se encontraron los boletos", 404));
            }

            res.status(200).json(boletos);
        } catch (error) {
            next(new AppError("No se pudieron encontrar los boletos del carrito", 404));
        }
    }

    static async obtenerTotalPrecioBoletosPorIdCarrito(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                return next(new AppError("El campo id es obligatorio", 500));
            }

            const total = await CarritoDAO.obtenerTotalPrecioBoletosPorIdCarrito(id);
            
            res.status(200).json({ total });
        } catch (error) {
            next(new AppError("No se pudieron encontrar los boletos del carrito", 404));
        }
    }
}

module.exports = CarritoController;