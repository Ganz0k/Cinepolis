const { Carritos } = require("../models");

class CarritosDAO {

    constructor() {

    }

    async crearCarrito(id_usuario, boletos) {
        try {
            const carrito = await Carritos.create({ id_usuario, boletos });

            return carrito;
        } catch (error) {
            throw error;
        }
    }

    async obtenerCarritos() {
        try {
            const carritos = await Carritos.findAll();

            return carritos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerCarritoPorId(id) {
        try {
            const carrito = await Carritos.findByPk(id);

            return carrito;
        } catch (error) {
            throw error;
        }
    }

    async editarCarrito(id, id_usuario, boletos) {
        try {
            await Carritos.update({ id_usuario, boletos }, { where: { id } });
            const carritoActualizado = await Carritos.findByPk(id);

            return carritoActualizado;
        } catch (error) {
            throw error;
        }
    }

    async eliminarCarrito(id) {
        try {
            const carrito = await Carritos.findByPk(id);

            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }

            await carrito.destroy();

            return "Carrito eliminado con éxito";
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CarritosDAO();