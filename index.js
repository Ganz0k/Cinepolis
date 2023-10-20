// Importa los módulos necesarios
const db = require("./config/db");
const Administrador = require("./models/administrador");
const AdministradorDAO = require("./dataAccess/administradorDAO");
const Boleto = require("./models/boleto");
const BoletoDAO = require("./dataAccess/boletoDAO");
const Carrito = require("./models/carrito");
const CarritoDAO = require("./dataAccess/carritoDAO");
const Cliente = require("./models/cliente");
const ClienteDAO = require("./dataAccess/clienteDAO");
const Pago = require("./models/pago");
const PagoDAO = require("./dataAccess/pagoDAO");
const Pelicula = require("./models/pelicula");
const PeliculaDAO = require("./dataAccess/peliculaDAO");
const fs = require("fs");

db.conectar()
    .then(async () => {
        try {
            const horarios = ["13:00", "17:30", "20:00"];
            const imagen = fs.readFileSync("images\\terminator-2-el-juicio-final.jpg");
            const pelicula = new Pelicula("Terminator 2: Judgement Day", "Secuela de Terminator", 49, imagen, horarios);
            const dbPelicula = await PeliculaDAO.crearPelicula(pelicula);
            console.log(`Película ${pelicula.nombre} creada`);

            const partesHora = horarios[2].split(":");
            const horario = new Date(2023, 9, 6, parseInt(partesHora[0]), parseInt(partesHora[1]), 0);
            const boleto = new Boleto(undefined, undefined, "G7", horario, "Pendiente");
            const nuevoBoleto = await BoletoDAO.crearBoleto(dbPelicula._id, boleto);
            console.log("Boleto creado: ", nuevoBoleto.boletos[0]);

            // Ejemplo de uso del DAO de Cliente para crear un cliente
            const cliente = new Cliente("Cliente de Prueba", "cliente@example.com", "password123", undefined, undefined, []);
            const nuevoCliente = await ClienteDAO.crearCliente(cliente);
            console.log("Cliente creado: ", nuevoCliente);

            const carrito = new Carrito(nuevoCliente._id, []);
            const nuevoCarrito = await CarritoDAO.crearCarrito(carrito);
            console.log("Carrito 1 creado");

            cliente.idCarrito = nuevoCarrito._id;
            await ClienteDAO.actualizarCliente(nuevoCliente._id, cliente);
            console.log(`Carrito 1 agregado al cliente ${cliente.nombre}`);

            // Ejemplo de uso del DAO de Administrador para crear un administrador
            const permisos = ["Registrar películas", "Eliminar películas"];
            const administrador = new Administrador("Administrador de Prueba", "admin@example.com", "admin123", undefined, permisos);
            const nuevoAdministrador = await AdministradorDAO.crearAdministrador(administrador);
            console.log("Administrador creado:", nuevoAdministrador);

            const boletoConCliente = new Boleto(undefined, nuevoCliente._id, "K10", horario, "Pendiente");
            const nuevoBoletoConCliente = await BoletoDAO.crearBoleto(dbPelicula._id, boletoConCliente);
            carrito.boletos.push(nuevoBoletoConCliente._id);
            const nuevoCarrito1 = await CarritoDAO.actualizarCarrito(nuevoCarrito._id, carrito);
            console.log(`Boleto de cliente ${cliente.nombre} añadido al carrito`);

            const pago = new Pago(undefined, pelicula.precioBoleto, "Tarjeta de crédito", new Date(), nuevoCarrito1.boletos);
            const nuevoPago = await PagoDAO.crearPago(nuevoCliente._id, pago);
            boletoConCliente.estado = "Pagado";
            boletoConCliente._id = nuevoBoletoConCliente.boletos[1]._id;
            await BoletoDAO.actualizarBoleto(dbPelicula._id, boletoConCliente._id, boletoConCliente);
            console.log("Nuevo pago creado", nuevoPago.historialCompras[0]);

            db.desconectar();
        } catch (error) {
            console.error("Error en la aplicación:", error);
        }
    })
    .catch(err => {
        console.error("Error en las pruebas: ", err);
    });