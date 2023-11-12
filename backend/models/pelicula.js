class Pelicula {

    constructor(nombre, descripcion, precioBoleto, imagen, horarios, boletos) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precioBoleto = precioBoleto;
        this.imagen = imagen;
        this.horarios = horarios;
        this.boletos = boletos;
    }
}

module.exports = Pelicula;