const { Administradores } = require("../models");

class AdministradoresDAO {

    constructor() {}

    async crearAdministrador(id_usuario, permisos) {
        try {
            const administrador = await Administradores.create({ id_usuario, permisos });
            return administrador;
        } catch (error) {
            throw error;
        }
    }

    async obtenerAdministradorPorId(id) {
        try {
            const administrador = await Administradores.findByPk(id);
            return administrador;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new AdministradoresDAO();
