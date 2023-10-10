const Usuario = require("../schemas/usuario"); // Importa el modelo de usuario

class ClienteDAO {

    static async crearCliente(clienteData) {
        try {
            clienteData.rol = "cliente"; // Establece el rol como cliente
            const cliente = new Usuario(clienteData);
            return await cliente.save();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerClientePorId(id) {
        try {
            // Busca un usuario con el rol de cliente
            return await Usuario.findOne({ _id: id, rol: "cliente" });
        } catch (error) {
            throw error;
        }
    }

    static async actualizarCliente(id, clienteData) {
        try {
            // Actualiza un usuario con el rol de cliente
            return await Usuario.findOneAndUpdate({ _id: id, rol: "cliente" }, clienteData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    static async eliminarCliente(id) {
        try {
            // Elimina un usuario con el rol de cliente
            return await Usuario.findOneAndRemove({ _id: id, rol: "cliente" });
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ClienteDAO;
