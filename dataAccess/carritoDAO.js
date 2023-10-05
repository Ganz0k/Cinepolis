const Carrito = require("../schemas/carrito");
const Pelicula = require("../schemas/pelicula");

class CarritoDAO {

    static async crearCarrito(carritoData) {
        try {
            const carrito = new Carrito(carritoData);

            return await carrito.save();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerCarritoPorId(id) {
        try {
            return await Carrito.findById(id);
        } catch (error) {
            throw error;
        }
    }

    static async actualizarCarrito(id, carritoData) {
        try {
            return await Carrito.findByIdAndUpdate(id, carritoData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerBoletosPorIdCarrito(id) {
        try {
            const carrito = await Carrito.findById(id);
            const idBoletos = carrito.boletos;
            const peliculas = await Pelicula.find();
            let boletos = [];

            for (p of peliculas) {
                for (b of p.boletos) {
                    for (idB of idBoletos) {
                        if (b._id === idB) {
                            boletos.push(b);
                            break;
                        }
                    }
                }
            }

            return boletos;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CarritoDAO;