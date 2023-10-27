const Pelicula = require("../models/pelicula");
const PeliculaDAO = require("../dataAccess/peliculaDAO");
const { AppError } = require("../utils/appError");

class PeliculaController {

    static async crearPelicula(req, res, next) {
        try {
            const { nombre, descripcion, precioBoleto, imagen, horarios } = req.body;

            if (!nombre || !descripcion || !precioBoleto || !imagen || !horarios) {
                return ext(new AppError("Los campos nombre, descripcion, precioBoleto, imagen y horarios son obligatorios", 500));
            }

            const pelicula = new Pelicula(nombre, descripcion, precioBoleto, imagen, horarios, []);
            const peliculaCreada = await PeliculaDAO.crearPelicula(pelicula);

            res.status(200).json(peliculaCreada);
        } catch (error) {
            next(new AppError("Error al crear la película", 500));
        }
    }

    static async obtenerPeliculaPorId(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                return next(new AppError("El campo id es obligatorio", 500));
            }

            const pelicula = await PeliculaDAO.obtenerPeliculaPorId(id);

            if (!pelicula) {
                return next(new AppError("No se pudo encontrar la película", 404));
            }

            res.status(200).json(pelicula);
        } catch (error) {
            next(new AppError("No se pudo obtener la película", 404));
        }
    }

    static async actualizarPelicula(req, res, next) {
        try {
            const id = req.params.id;
            const { nombre, descripcion, precioBoleto, imagen, horarios, boletos } = req.body;

            if (!id || !nombre || !descripcion || !precioBoleto || !imagen || !horarios || !boletos) {
                return next(new AppError("Los campos id, nombre, descripcion, precioBoleto, imagen, horarios y boletos son obligatorios", 500));
            }

            const pelicula = new Pelicula(nombre, descripcion, precioBoleto, imagen, horarios, boletos);
            const peliculaActualizada = await PeliculaDAO.actualizarPelicula(id, pelicula);

            res.status(200).json(peliculaActualizada);
        } catch (error) {
            next(new AppError("Error al actualizar la película", 500));
        }
    }

    static async eliminarPelicula(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                return next(new AppError("El campo id es obligatorio", 500));
            }

            const peliculaEliminada = await PeliculaDAO.eliminarPelicula(id);

            if (!peliculaEliminada) {
                return next(new AppError("No se encontró la película", 404));
            }

            res.status(200).json({ message: "Película eliminada correctamente" });
        } catch (error) {
            next(new AppError("Error al eliminar la película", 404));
        }
    }

    static async obtenerPeliculas(req, res, next) {
        try {
            const limit = req.params.limit || 10;

            const peliculas = await PeliculaDAO.obtenerPeliculas(limit);

            if (!peliculas) {
                return next(new AppError("No se pudieron encontrar las películas", 404));
            }

            res.status(200).json(peliculas);
        } catch (error) {
            next(new AppError("No se pudieron encontrar las películas", 404));
        }
    }
}

module.exports = PeliculaController;