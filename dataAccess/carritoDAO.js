const Carrito = require("../schemas/carrito");
const Pelicula = require("../schemas/pelicula");
const Mongoose = require("mongoose");

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
            let peliculasEnCarrito = [];

            for (let p of peliculas) {
                peliculasEnCarrito.push({
                    idPelicula: p._id,
                    titulo: p.nombre,
                    sinopsis: p.descripcion,
                    imagen: p.imagen,
                    precioBoleto: p.precioBoleto,
                    boletos: []
                });

                for (let b of p.boletos) {
                    for (let idB of idBoletos) {
                        if (new Mongoose.Types.ObjectId(b._id.toString()).equals(new Mongoose.Types.ObjectId(idB.toString()))) {
                            let pelicula = peliculasEnCarrito[peliculasEnCarrito.length - 1];
                            pelicula.boletos.push(b);
                            break;
                        }
                    }
                }
            }

            return peliculasEnCarrito;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerTotalPrecioBoletosPorIdCarrito(id) {
        try {
            const carrito = await Carrito.findById(id);
            const idBoletos = carrito.boletos;
            const peliculas = await Pelicula.find();
            let precioTotal = 0;

            for (let p of peliculas) {
                for (let b of p.boletos) {
                    for (let idB of idBoletos) {
                        if (new Mongoose.Types.ObjectId(b._id.toString()).equals(new Mongoose.Types.ObjectId(idB.toString()))) {
                            precioTotal += p.precioBoleto;
                        }
                    }
                }
            }

            return precioTotal;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CarritoDAO;