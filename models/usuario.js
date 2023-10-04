class Usuario {

    constructor(nombre, correoElectronico, password, rol) {
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.password = password;
        this.rol = rol;
    }
}

module.exports = Usuario;