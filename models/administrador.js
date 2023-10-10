const Usuario = require("./usuario");

class Administrador extends Usuario {

    constructor(nombre, correoElectronico, password, rol = "administrador", permisos) {
        super(nombre, correoElectronico, password, rol);
        this.permisos = permisos;
    }
}

module.exports = Administrador;