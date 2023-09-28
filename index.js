const BoletosDAO = require("./dataAccess/boletosDAO");
const CarritosDAO = require("./dataAccess/carritosDAO");
const PeliculasDAO = require("./dataAccess/peliculasDAO");
const UsuariosDAO = require("./dataAccess/usuariosDAO");
const ClientesDAO = require("./dataAccess/clientesDAO"); 
const AdministradoresDAO = require("./dataAccess/administradoresDAO"); 
const PagosDAO = require("./dataAccess/pagosDAO"); 
const { sequelize } = require("./models");


async function main() {
    try {
        await sequelize.sync();

        const usuarioCliente = await UsuariosDAO.crearUsuario("Cliente1", "cliente1@hotmail.com", "1234", "Cliente");
        console.log("Cliente creado:", usuarioCliente);

        const cliente = await ClientesDAO.crearCliente(usuarioCliente.id, { compras: [] });
        console.log("Cliente finalizado: ", cliente);

        const usuarioAdministrador = await UsuariosDAO.crearUsuario("Admin1", "admin1@gmail.com", "admin1", "Administrador");
        console.log("Administrador creado:", usuarioAdministrador);

        const administrador = await AdministradoresDAO.crearAdministrador(usuarioAdministrador.id, { permisos: ["Administrar usuarios", "Administrar películas"] });
        console.log("Administrador finalizado:", administrador);

        const pelicula = await PeliculasDAO.crearPelicula("Terminator 2: Judgment Day", "Sequel of the Terminator", 59.90, "assets/images/terminator2.jpg", {
            horarios: [
                "13:35:00",
                "16:20:00",
                "19:00:00",
                "21:40:00"
            ]
        });
        console.log("Película creada:", pelicula);

        const boleto = await BoletosDAO.crearBoleto(pelicula.id, usuarioCliente.id, "G7", "2023-09-25 " + pelicula.horarios.horarios[3]);
        console.log("Boleto creado:", boleto);

        const carrito = await CarritosDAO.crearCarrito(usuarioCliente.id, {
            boletos: [
                boleto.id
            ]
        });
        console.log("Carrito creado:", carrito);

        const pago = await PagosDAO.crearPago(usuarioCliente.id, 59.90, "Tarjeta de crédito", "2023-09-24 10:30:00");
        console.log("Pago creado:", pago);

        const usuarios = await UsuariosDAO.obtenerUsuarios();
        const peliculas = await PeliculasDAO.obtenerPeliculas();
        const boletos = await BoletosDAO.obtenerBoletos();
        const carritos = await CarritosDAO.obtenerCarritos();
        const pagos = await PagosDAO.obtenerPagos();

        console.log("Usuarios: ", usuarios);
        console.log("Peliculas: ", peliculas);
        console.log("Boletos: ", boletos);
        console.log("Carritos: ", carritos);
        console.log("Pagos: ", pagos);
    } catch (error) {
        console.log("Error en las transacciones: ", error);
    } finally {
        await sequelize.close();
    }
}

main();