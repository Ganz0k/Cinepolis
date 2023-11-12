const Mongoose = require("mongoose");

class Pago {

    constructor(_id = new Mongoose.Types.ObjectId(), monto, metodoPago, fechaPago, boletos) {
        this._id = _id;
        this.monto = monto;
        this.metodoPago = metodoPago;
        this.fechaPago = fechaPago;
        this.boletos = boletos;
    }
}

module.exports = Pago;