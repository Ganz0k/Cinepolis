const BoletosDAO = require("./dataAccess/boletosDAO");
const CarritosDAO = require("./dataAccess/carritosDAO");
const PeliculasDAO = require("./dataAccess/peliculasDAO");
const UsuariosDAO = require("./dataAccess/usuariosDAO");
const { sequelize } = require("./models");

async function main() {
    try {
        await sequelize.sync();

        const cliente = await UsuariosDAO.crearUsuario("Cliente1", "cliente1@hotmail.com", "1234", "Cliente");
        console.log(cliente);

        const administrador = await UsuariosDAO.crearUsuario("Admin1", "admin1@gmail.com", "admin1", "Administrador");
        console.log(administrador);

        const pelicula = await PeliculasDAO.crearPelicula("Terminator 2: Judgement Day", "Sequel of the Terminator", 59.90, "assets/images/terminator2.jpg", {
            horarios: [
                "13:35:00",
                "16:20:00",
                "19:00:00",
                "21:40:00"
            ]
        });
        console.log(pelicula);

        const boleto = await BoletosDAO.crearBoleto(pelicula.id, cliente.id, "G7", "2023-09-25 " + pelicula.horarios.horarios[3]);
        console.log(boleto);

        const carrito = await CarritosDAO.crearCarrito(cliente.id, {
            boletos: [
                boleto.id
            ]
        });

        const usuarios = await UsuariosDAO.obtenerUsuarios();
        const peliculas = await PeliculasDAO.obtenerPeliculas();
        const boletos = await BoletosDAO.obtenerBoletos();
        const carritos = await CarritosDAO.obtenerCarritos();

        console.log("Usuarios: ", usuarios);
        console.log("Peliculas: ", peliculas);
        console.log("Boletos: ", boletos);
        console.log("Carritos: ", carritos);

        await UsuariosDAO.editarUsuario(cliente.id, "Cliente actualizado", "actualizado@hotmail.com", "1234", "Cliente");
        console.log("Usuario actualizado");

        await PeliculasDAO.editarPelicula(pelicula.id, pelicula.nombre, "Descripción actualizada", pelicula.precio_boleto, pelicula.imagen, pelicula.horarios);
        console.log("Pelicula actualizada");

        await BoletosDAO.eliminarBoleto(boleto.id);
        console.log("Boleto eliminado");
    } catch (error) {
        console.log("Error en las transacciones: ", error);
    } finally {
        await sequelize.close();
    }
}

main();