const Pelicula = require("../schemas/pelicula");

class PagoDAO {
    static async calcularMontoTotalDelCarrito(carrito) {
        try {
            let montoTotal = 0;

            // Recorre cada boleto en el carrito y consulta el precio de la película asociada a ese boleto.
            // Luego, suma el precio del boleto al monto total del carrito.
            for (const boletoId of carrito.boletos) {
                const boleto = await Pelicula.findOne({ "boletos._id": boletoId });
                if (boleto) {
                    // Encuentra la información del boleto en la película
                    const boletoInfo = boleto.boletos.find(b => b._id.toString() === boletoId.toString());
                    if (boletoInfo) {
                        // Suma el precio del boleto al monto total
                        montoTotal += boletoInfo.precioBoleto;
                    }
                }
            }

            return montoTotal;
        } catch (error) {
            throw error;
        }
    }

    // Método para crear un pago en el carrito
    static async agregarPago(idCarrito, pagoData) {
        try {
            // Realiza la lógica para crear el pago y asociarlo al carrito
            const carrito = await Carrito.findById(idCarrito);

            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }

            const montoTotal = await this.calcularMontoTotalDelCarrito(carrito);

            const nuevoPago = {
                monto: montoTotal,
                metodoPago: pagoData.metodoPago,
                fechaPago: new Date(),
            };

            carrito.historialCompras.push(nuevoPago);

            await carrito.save();

            return nuevoPago;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPagoPorId(id) {
        try {
            return await Pago.findById(id);
        } catch (error) {
            throw error;
        }
    }

    static async actualizarPago(id, pagoData) {
        try {
            return await Pago.findByIdAndUpdate(id, pagoData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    static async eliminarPago(id) {
        try {
            return await Pago.findByIdAndRemove(id);
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPagosDeCliente(clienteId) {
        try {
            // Busca al cliente por su ID
            const cliente = await Cliente.findById(clienteId);

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
