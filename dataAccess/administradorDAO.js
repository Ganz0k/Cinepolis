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

    static async obtenerAdministrador(nombre, password) {
        try {
            // Busca un usuario con el rol de administrador
            return await Usuario.findOne({ nombre, password, rol: "administrador" });
        } catch (error) {
            throw error;
        }
    }

    static async actualizarAdministrador(id, administradorData) {
        try {
            // Actualiza un usuario con el rol de administrador
            return await Usuario.findOneAndUpdate({ _id: id, rol: "administrador" }, administradorData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    static async eliminarAdministrador(id) {
        try {
            // Elimina un usuario con el rol de administrador
            return await Usuario.findOneAndRemove({ _id: id, rol: "administrador" });
        } catch (error) {
            throw error;
        }
    }

}

module.exports = AdministradorDAO;