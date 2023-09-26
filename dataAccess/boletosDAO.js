const { Boletos } = require("../models");

class BoletosDAO {
    
    constructor() {

    }

    async crearBoleto(id_pelicula, id_usuario, asiento, horario) {
        try {
            const boleto = await Boletos.create({ id_pelicula, id_usuario, asiento, horario });

            return boleto;
        } catch (error) {
            throw error;
        }
    }

    async obtenerBoletos() {
        try {
            const boletos = await Boletos.findAll();

            return boletos;
        } catch (error) {
            throw error;
        }
        
    }

    async obtenerBoletoPorId(id) {
        try {
            const boleto = await Boletos.findByPk(id);

            return boleto;
        } catch (error) {
            throw error;
        } 
    }

    async editarBoleto(id, id_pelicula, id_usuario, asiento, horario) {
        try {
            await Boletos.update({ id_pelicula, id_usuario, asiento, horario }, { where: { id } });
            const boletoActualizado = await Boletos.findByPk(id);

            return boletoActualizado;
        } catch (error) {
            throw error;
        }
    }

    async eliminarBoleto(id) {
        try {
            const boleto = await Boletos.findByPk(id);

            if (!boleto) {
                throw new Error("Boleto no encontrado");
            }

            await boleto.destroy();

            return "Boleto eliminado con éxito";
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BoletosDAO();