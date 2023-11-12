const Usuario = require("./usuario");

class Cliente extends Usuario {

    constructor(nombre, correoElectronico, password, rol = "cliente", idCarrito, historialCompras) {
        super(nombre, correoElectronico, password, rol);
        this.idCarrito = idCarrito;
        this.historialCompras = historialCompras;
    }
}

module.exports = Cliente;