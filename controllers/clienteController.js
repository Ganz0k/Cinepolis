const Cliente = require("../models/cliente");
const ClienteDAO = require("../dataAccess/clienteDAO");
const { AppError } = require("../utils/appError");

class ClienteController {
    
    static async crearCliente(req, res, next) {
        try {
            const { nombre, correoElectronico, password } = req.body;

            if (!nombre || !correoElectronico || !password) {
                next(new AppError("Los campos nombre, correoEelectronico y password son obligatorios", 500));
            }

            const expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            if (!expresionRegular.test(correoElectronico)) {
                next(new AppError("Correo inválido", 500));
            }

            const cliente = new Cliente(nombre, correoElectronico, password, undefined, null, []);
            const clienteRegistrado = await ClienteDAO.crearCliente(cliente);

            res.status(200).json(clienteRegistrado);
        } catch (error) {
            next(new AppError("Error al crear el cliente", 500))
        }
    }

    static async obtenerCliente(req, res, next) {
        try {
            const nombre = req.params.nombre;
            const password = req.params.password;

            if (!nombre || !password) {
                next(new AppError("Los campos nombre y password son obligatorios", 500));
            }

            const cliente = await ClienteDAO.obtenerCliente(nombre, password);

            if (!cliente) {
                next(new AppError("No se encontró el cliente", 404));
            }

            res.status(200).json(cliente);
        } catch (error) {
            next(new AppError("No se pudo obtener el cliente", 404));
        }
    }

    static async actualizarCliente(req, res, next) {
        try {
            const id = req.params.id;
            const { nombre, correoElectronico, password, rol, idCarrito, historialCompras } = req.body;

            if (!id || !nombre || !correoElectronico || !password || !rol || !idCarrito || !historialCompras) {
                next(new AppError("Los campos id, nombre, correoElectronico, password, rol, idCarrito e historialCompras son obligatorios", 500));
            }

            const expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            if (!expresionRegular.test(correoElectronico)) {
                next(new AppError("Correo inválido", 500));
            }

            const cliente = new Cliente(nombre, correoElectronico, password, rol, idCarrito, historialCompras);
            const clienteActualizado = await ClienteDAO.actualizarCliente(id, cliente);

            res.status(200).json(clienteActualizado);
        } catch (error) {
            next(new AppError("Error al actualizar el cliente", 500));
        }
    }

    static async eliminarCliente(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                next(new AppError("El campo id es obligatorio", 500));
            }

            const clienteEliminado = await ClienteDAO.eliminarCliente(id);

            if (!clienteEliminado) {
                next(new AppError("No se encontró el cliente", 404));
            }

            res.status(200).json({ message: "Cliente eliminado correctamente" });
        } catch (error) {
            next(new AppError("Error al eliminar el cliente", 404));
        }
    }
}

module.exports = ClienteController;