class Pago {

    #idPago;
    #idUsuario;
    #monto;
    #metodoPago;
    #fechaPago;

    constructor(idPago, idUsuario, monto, metodoPago, fechaPago) {
        this.#idPago = idPago;
        this.#idUsuario = idUsuario;
        this.#monto = monto;
        this.#metodoPago = metodoPago;
        this.#fechaPago = fechaPago;
    }

    getIdPago() {
        return this.#idPago;
    }

    setIdPago(idPago) {
        this.#idPago = idPago;
    }

    getIdUsuario() {
        return this.#idUsuario;
    }

    setIdUsuario(idUsaurio) {
        this.#idUsuario = idUsaurio;
    }

    getMonto() {
        return this.#monto;
    }

    setMonto(monto) {
        this.#monto = monto;
    }

    getMetodoPago() {
        return this.#metodoPago;
    }

    setMetodoPago(metodoPago) {
        this.#metodoPago = metodoPago;
    }

    getFechaPago() {
        return this.#fechaPago;
    }

    setFechaPago(fechaPago) {
        this.#fechaPago = fechaPago;
    }
}

module.exports = Pago;