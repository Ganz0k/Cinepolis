const Pelicula = require("../schemas/pelicula");
const Mongoose = require("mongoose");

class BoletoDAO {

    static async crearBoleto(idPelicula, boletoData) {
        try {
            const pelicula = await Pelicula.findById(idPelicula);

            if (!pelicula) {
                throw new Error("Película no encontrada");
            }

            pelicula.boletos.push(boletoData);

            return (await pelicula.save()).boletos[pelicula.boletos.length - 1];
        } catch (error) {
            throw error;
        }
    }

    static async obtenerBoletoPorId(idPelicula, idBoleto) {
        try {
            const pelicula = await Pelicula.findById(idPelicula);

            if (!pelicula) {
                throw new Error("Película no encontrada");
            }

            for (let b of pelicula.boletos) {
                if (new Mongoose.Types.ObjectId(b._id.toString()).equals(new Mongoose.Types.ObjectId(idBoleto.toString()))) {
                    return b;
                }
            }

            throw new Error("Boleto no encontrado");
        } catch (error) {
            throw error;
        }
    }

    static async actualizarBoleto(idPelicula, idBoleto, boletoData) {
        try {
            const pelicula = await Pelicula.findById(idPelicula);

            if (!pelicula) {
                throw new Error("Película no encontrada");
            }

            for (let i = 0; i < pelicula.boletos.length; i++) {
                if (new Mongoose.Types.ObjectId(pelicula.boletos[i]._id.toString()).equals(new Mongoose.Types.ObjectId(idBoleto.toString()))) {
                    pelicula.boletos[i] = boletoData;

                    return (await pelicula.save()).boletos[i];
                }
            }

            throw new Error("Boleto no encontrado");
        } catch (error) {
            throw error;
        }
    }

    static async obtenerBoletosPorPelicula(idPelicula) {
        try {
            const pelicula = await Pelicula.findById(idPelicula);

            if (!pelicula) {
                throw new Error("Película no encontrada");
            }

            return pelicula.boletos;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BoletoDAO;