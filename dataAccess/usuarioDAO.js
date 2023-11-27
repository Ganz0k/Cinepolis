const Usuario = require("../schemas/usuario");

class UsuarioDAO {

    static async obtenerUsuario(nombre, password) {
        try {
            return await Usuario.findOne({ nombre, password });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsuarioDAO;