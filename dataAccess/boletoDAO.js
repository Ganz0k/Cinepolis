const Pelicula = require("../schemas/pelicula");

class BoletoDAO {

    static async crearBoleto(idPelicula, boletoData) {
        try {
            const pelicula = await Pelicula.findById(idPelicula);

            if (!pelicula) {
                throw new Error("Película no encontrada");
            }

            pelicula.boletos.push(boletoData);

            return await pelicula.save();
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

            for (b of pelicula.boletos) {
                if (b._id === idBoleto) {
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

            for (b of pelicula.boletos) {
                if (b._id === idBoleto) {
                    b = boletoData;
                    return await pelicula.save();
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