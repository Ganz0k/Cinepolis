const Mongoose = require("mongoose");

class Pago {

    constructor(_id = new Mongoose.Types.ObjectId(), monto, metodoPago, fechaPago) {
        this._id = _id;
        this.monto = monto;
        this.metodoPago = metodoPago;
        this.fechaPago = fechaPago;
    }
}

module.exports = Pago;