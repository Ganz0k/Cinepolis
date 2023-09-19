class Usuario {

    constructor(idUsuario, nombre, correoElectronico, password, rol) {
        this._idUsuario = idUsuario;
        this._nombre = nombre;
        this._correoElectronico = correoElectronico;
        this._password = password;
        this._rol = rol;
    }

    getIdUsuario() {
        return this._idUsuario;
    }

    setIdUsuario(idUsuario) {
        this._idUsuario = idUsuario;
    }

    getNombre() {
        return this._nombre;
    }

    setNombre(nombre) {
        this._nombre = nombre;
    }

    getCorreoElectronico() {
        return this._correoElectronico;
    }

    setCorreoElectronico(correoElectronico) {
        this._correoElectronico = correoElectronico;
    }

    getPassword() {
        return this._password;
    }

    setPassword(password) {
        this._password = password;
    }

    getRol() {
        return this._rol;
    }

    setRol(rol) {
        this._rol = rol;
    }
}

module.exports = Usuario;