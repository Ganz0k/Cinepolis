const Mongoose = require("mongoose");

const carritoSchema = new Mongoose.Schema({
    idUsuario: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "usuario",
        required: true
    },
    boletos: [{
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    }]
});

module.exports = Mongoose.model("carrito", carritoSchema);