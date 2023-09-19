class Boleto {

    #idBoleto;
    #idPelicula;
    #idUsuario;
    #asiento;
    #horario;
    #estado;

    constructor(idBoleto, idPelicula, idUsuario, asiento, horario, estado) {
        this.#idBoleto = idBoleto;
        this.#idPelicula = idPelicula;
        this.#idUsuario = idUsuario;
        this.#asiento = asiento;
        this.#horario = horario;
        this.#estado = estado;
    }

    getIdBoleto() {
        return this.#idBoleto;
    }

    setIdBoleto(idBoleto) {
        this.#idBoleto = idBoleto;
    }

    getIdPelicula() {
        return this.#idPelicula;
    }

    setIdPelicula(idPelicula) {
        this.#idPelicula = idPelicula;
    }

    getIdUsuario() {
        return this.#idUsuario;
    }

    setIdUsuario(idUsuario) {
        this.#idUsuario = idUsuario;
    }

    getAsiento() {
        return this.#asiento;
    }

    setAsiento(asiento) {
        this.#asiento = asiento;
    }

    getHorario() {
        return this.#horario;
    }

    setHorario(horario) {
        this.#horario = horario;
    }

    getEstado() {
        return this.#estado;
    }

    setEstado(estado) {
        this.#estado = estado;
    }
}

module.exports = Boleto;