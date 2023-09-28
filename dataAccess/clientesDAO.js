const { Clientes } = require("../models");

class ClientesDAO {

    constructor() {}

    async crearCliente(id_usuario, historial_compras) {
        try {
            const cliente = await Clientes.create({ id_usuario, historial_compras });
            return cliente;
        } catch (error) {
            throw error;
        }
    }

    async obtenerClientePorId(id) {
        try {
            const cliente = await Clientes.findByPk(id);
            return cliente;
        } catch (error) {
            throw error;
        }
    }

    async actualizarInformacionCliente(id, id_usuario, historial_compras) {
        try {
            await Clientes.update({ id_usuario, historial_compras }, { where: { id } });
            const clienteActualizado = await Clientes.findByPk(id);
            return clienteActualizado;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new ClientesDAO();
