const Usuario = require("../schemas/usuario"); // Importa el modelo de usuario

class AdministradorDAO {

    static async crearAdministrador(administradorData) {
        try {
            const administrador = new Usuario(administradorData);

            return await administrador.save();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerAdministradorPorId(id) {
        try {
            return await Usuario.findOne({ _id: id, rol: "administrador" });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AdministradorDAO;