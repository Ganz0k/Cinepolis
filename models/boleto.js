const Mongoose = require("mongoose");

class Boleto {

    constructor(_id = new Mongoose.Types.ObjectId(), idUsuario, asiento, horario, estado) {
        this._id = _id;
        this.idUsuario = idUsuario;
        this.asiento = asiento;
        this.horario = horario;
        this.estado = estado;
    }
}

module.exports = Boleto;