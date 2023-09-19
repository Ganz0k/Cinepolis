const usuario = require('./usuario');

class Cliente extends usuario {

    #idCliente;
    #historialCompras;

    constructor(idUsuario, nombre, correoElectronico, password, rol, idCliente, historialCompras) {
        super(idUsuario, nombre, correoElectronico, password, rol);
        this.#idCliente = idCliente;
        this.#historialCompras = historialCompras;
    }

    getIdCliente() {
        return this.#idCliente;
    }

    setIdCliente(idCliente) {
        this.#idCliente = idCliente;
    }

    getHistorialCompras() {
        return this.#historialCompras;
    }

    setHistorialCompras(historialCompras) {
        this.#historialCompras = historialCompras;
    }
}

module.exports = Cliente;