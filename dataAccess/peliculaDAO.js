const Pelicula = require("../schemas/pelicula");

class PeliculaDAO {

    static async crearPelicula(peliculaData) {
        try {
            const pelicula = new Pelicula(peliculaData);

            return await pelicula.save();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPeliculaPorId(id) {
        try {
            return await Pelicula.findById(id);
        } catch (error) {
            throw error;
        }
    }

    static async actualizarPelicula(id, peliculaData) {
        try {
            return await Pelicula.findByIdAndUpdate(id, peliculaData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    static async eliminarPelicula(id) {
        try {
            return await Pelicula.findByIdAndRemove(id);
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPeliculas() {
        try {
            return await Pelicula.find();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PeliculaDAO;