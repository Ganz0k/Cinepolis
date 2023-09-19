const usuario = require('./usuario');

class Administrador extends usuario {

    #idAdministrador;
    #permisos;

    constructor(idUsuario, nombre, correoElectronico, password, rol, idAdministrador, permisos) {
        super(idUsuario, nombre, correoElectronico, password, rol);
        this.#idAdministrador = idAdministrador;
        this.#permisos = permisos;
    }

    getIdAdministrador() {
        return this.#idAdministrador;
    }

    setIdAdministrador(idAdministrador) {
        this.#idAdministrador = idAdministrador;
    }

    getPermisos() {
        return this.#permisos;
    }

    setPermisos(permisos) {
        this.#permisos = permisos;
    }
}

module.exports = Administrador;