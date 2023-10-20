const Usuario = require("../schemas/usuario");
const Mongoose = require("mongoose");

class PagoDAO {

    // Método para crear un pago en el carrito
    static async crearPago(idCliente, pagoData) {
        try {
            // Realiza la lógica para crear el pago y asociarlo al carrito
            const cliente = await Usuario.findById(idCliente);

            if (!cliente) {
                throw new Error("Cliente no encontrado");
            }

            cliente.historialCompras.push(pagoData);

            return (await cliente.save()).historialCompras[cliente.historialCompras.length - 1];
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPagoPorId(idCliente, idPago) {
        try {
            const cliente = await Usuario.findById(idCliente);

            if (!cliente) {
                throw new Error("Cliente no encontrado");
            }

            for (hC of cliente.historialCompras) {
                if (new Mongoose.Types.Object(hC._id.toString()).equals(new Mongoose.Types.Object(idPago))) {
                    return hC;
                }
            }

            throw new Error("Pago no encontrado");
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPagosDeCliente(idCliente) {
        try {
            // Busca al cliente por su ID
            const cliente = await Usuario.findById(idCliente);

            if (!cliente) {
                throw new Error("Cliente no encontrado");
            }

            // Retorna el historial de compras del cliente, que contiene todos los pagos
            return cliente.historialCompras;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PagoDAO;