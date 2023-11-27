require("dotenv").config({ path: "../variables.env" });
const Cliente = require("../models/cliente");
const ClienteDAO = require("../dataAccess/clienteDAO");
const { AppError } = require("../utils/appError");
const jwt = require("jsonwebtoken");

class ClienteController {
    
    static async crearCliente(req, res, next) {
        try {
            const { nombre, correoElectronico, password } = req.body;

            if (!nombre || !correoElectronico || !password) {
                return next(new AppError("Los campos nombre, correoEelectronico y password son obligatorios", 500));
            }

            const expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            if (!expresionRegular.test(correoElectronico)) {
                return next(new AppError("Correo inválido", 500));
            }

            const cliente = new Cliente(nombre, correoElectronico, password, undefined, null, []);
            const clienteRegistrado = await ClienteDAO.crearCliente(cliente);

            const dataToSign = {
                idUsuario: clienteRegistrado._id,
                rol: clienteRegistrado.rol
            };

            const accessToken = jwt.sign(dataToSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });

            res.status(200).json({ accessToken: accessToken });
        } catch (error) {
            next(new AppError("Error al crear el cliente", 500))
        }
    }

    static async actualizarCliente(req, res, next) {
        try {
            const id = req.cliente;

            const { nombre, correoElectronico, password, rol, idCarrito, historialCompras } = req.body;

            if (!id || !nombre || !correoElectronico || !password || !rol || !idCarrito || !historialCompras) {
                return next(new AppError("Los campos id, nombre, correoElectronico, password, rol, idCarrito e historialCompras son obligatorios", 500));
            }

            const expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            if (!expresionRegular.test(correoElectronico)) {
                return next(new AppError("Correo inválido", 500));
            }

            const cliente = new Cliente(nombre, correoElectronico, password, rol, idCarrito, historialCompras);
            await ClienteDAO.actualizarCliente(id, cliente);

            res.status(200).json({ message: "Cliente actualizado :)" });
        } catch (error) {
            next(new AppError("Error al actualizar el cliente", 500));
        }
    }

    static async obtenerCliente(req, res, next) {
        try {
            const cliente = await ClienteDAO.obtenerClientePorId(req.cliente);

            res.status(200).json(cliente);
        } catch (error) {
            next(new AppError("Error al buscar el cliente", 404));
        }
    }
}

module.exports = ClienteController;