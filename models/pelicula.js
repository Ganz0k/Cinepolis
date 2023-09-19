class Pelicula {

    #idPelicula;
    #nombre;
    #descripcion;
    #precioBoleto;
    #imagen;
    #horarios

    constructor(idPelicula, nombre, descripcion, precioBoleto, imagen, horarios) {
        this.#idPelicula = idPelicula;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#precioBoleto = precioBoleto;
        this.#imagen = imagen;
        this.#horarios = horarios;
    }

    getIdPelicula() {
        return this.#idPelicula;
    }

    setIdPelicula(idPelicula) {
        this.#idPelicula = idPelicula;
    }

    getNombre() {
        return this.#nombre;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

    getDescricion() {
        return this.#descripcion;
    }

    setDescripcion(descripcion) {
        this.#descripcion = descripcion;
    }

    getPrecioBoleto() {
        return this.#precioBoleto;
    }

    setPrecioBoleto(precioBoleto) {
        this.#precioBoleto = precioBoleto;
    }

    getImagen() {
        return this.#imagen;
    }

    setImagen(imagen) {
        this.#imagen = imagen;
    }

    getHorarios() {
        return this.#horarios;
    }

    setHorarios(horarios) {
        this.#horarios = horarios;
    }
}

module.exports = Pelicula;