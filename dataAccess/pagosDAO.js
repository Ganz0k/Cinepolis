const { Pagos } = require("../models");

class PagosDAO {
    constructor() {}

    async crearPago(id_usuario, monto, metodo_pago, fecha_pago) {
        try {
            const pago = await Pagos.create({ id_usuario, monto, metodo_pago, fecha_pago });
            return pago;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPagoPorId(id) {
        try {
            const pago = await Pagos.findByPk(id);
            return pago;
        } catch (error) {
            throw error;
        }
    }

    async actualizarPago(id, monto, metodo_pago) {
        try {
            await Pagos.update({ monto, metodo_pago }, { where: { id } });
            const pagoActualizado = await Pagos.findByPk(id);
            return pagoActualizado;
        } catch (error) {
            throw error;
        }
    }

    async eliminarPago(id) {
        try {
            const pago = await Pagos.findByPk(id);
            if (!pago) {
                throw new Error("Pago no encontrado");
            }
            await pago.destroy();
            return "Pago eliminado con éxito";
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PagosDAO();
