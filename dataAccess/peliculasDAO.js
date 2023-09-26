const { Peliculas } = require("../models");

class PeliculasDAO {
    
    constructor() {

    }

    async crearPelicula(nombre, descripcion, precio_boleto, imagen, horarios) {
        try {
            const pelicula = await Peliculas.create({ nombre, descripcion, precio_boleto, imagen, horarios });

            return pelicula;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPeliculas() {
        try {
            const peliculas = await Peliculas.findAll();

            return peliculas;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPeliculaPorId(id) {
        try {
            const pelicula = await Peliculas.findByPk(id);

            return pelicula;
        } catch (error) {
            throw error;
        }
    }

    async editarPelicula(id, nombre, descripcion, precio_boleto, imagen, horarios) {
        try {
            await Peliculas.update({ nombre, descripcion, precio_boleto, imagen, horarios }, { where: { id } });
            const peliculaActualizada = await Peliculas.findByPk(id);

            return peliculaActualizada;
        } catch (error) {
            throw error;
        }
    }

    async eliminarPelicula(id) {
        try {
            const pelicula = await Peliculas.findByPk(id);

            if (!pelicula) {
                throw new Error("Película no econtrada");
            }

            await pelicula.destroy();

            return "Película eliminada con éxito";
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PeliculasDAO();