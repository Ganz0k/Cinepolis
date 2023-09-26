const { Usuarios } = require("../models");

class UsuariosDAO {

    constructor() {

    }

    async crearUsuario(nombre, correo, password, rol) {
        try {
            const usuario = await Usuarios.create({ nombre, correo, password, rol });

            return usuario;
        } catch (error) {
            throw error;
        }
    }

    async obtenerUsuarios() {
        try {
            const usuarios = await Usuarios.findAll();

            return usuarios;
        } catch (error) {
            throw error;
        }
    }

    async obtenerUsuarioPorId(id) {
        try {
            const usuario = await Usuarios.findByPk(id);

            return usuario;
        } catch (error) {
            throw error;
        }
    }

    async editarUsuario(id, nombre, correo, password, rol) {
        try {
            await Usuarios.update({ nombre, correo, password, rol }, { where: { id } });
            const usuarioActualizado = await Usuarios.findByPk(id);

            return usuarioActualizado;
        } catch (error) {
            throw error;
        }
    }

    async eliminarUsuario(id) {
        try {
            const usuario = await Usuarios.findByPk(id);

            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }

            await usuario.destroy();

            return "Usuario eliminado con éxito";
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UsuariosDAO();