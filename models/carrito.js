class Carrito {

    #idCarrito;
    #idUsuario;
    #boletos;

    constructor(idCarrito, idUsuario, boletos) {
        this.#idCarrito = idCarrito;
        this.#idUsuario = idUsuario;
        this.#boletos = boletos;
    }

    getIdCarrito() {
        return this.#idCarrito;
    }

    setIdCarrito(idCarrito) {
        this.#idCarrito = idCarrito;
    }

    getIdUsuario() {
        return this.#idUsuario;
    }

    setIdUsuario(idUsuario) {
        this.#idUsuario = idUsuario;
    }

    getBoletos() {
        return this.#boletos;
    }

    setBoletos(boletos) {
        this.#boletos = boletos;
    }
}

module.exports = Carrito;