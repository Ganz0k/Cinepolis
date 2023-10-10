// Importa los módulos necesarios
const { conectar } = require("./config/db");
const ClienteDAO = require("./dataAccess/clienteDAO");
const AdministradorDAO = require("./dataAccess/administradorDAO");

async function main() {
    try {
        // Conectar a la base de datos
        await conectar();
        console.log("Conexión a la base de datos establecida con éxito");

        // Ejemplo de uso del DAO de Cliente para crear un cliente
        const cliente = {
            nombre: "Cliente de Prueba",
            correoElectronico: "cliente@example.com",
            password: "password123",
            rol: "cliente",
        };

        const nuevoCliente = await ClienteDAO.crearCliente(cliente);
        console.log("Cliente creado:", nuevoCliente);

        // Ejemplo de uso del DAO de Administrador para crear un administrador
        const administrador = {
            nombre: "Administrador de Prueba",
            correoElectronico: "admin@example.com",
            password: "admin123",
            rol: "administrador",
        };

        const nuevoAdministrador = await AdministradorDAO.crearAdministrador(administrador);
        console.log("Administrador creado:", nuevoAdministrador);
    } catch (error) {
        console.error("Error en la aplicación:", error);
    }
}

main();