const Mongoose = require("mongoose");

const usuarioSchema = new Mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    permisos: [{
        type: String,
        required: false
    }],
    idCarrito: {
        type: Mongoose.Schema.Types.ObjectId,
        required: false
    },
    historialCompras: [{
        _id: {
            type: Mongoose.Schema.Types.ObjectId,
            required: true
        },
        monto: {
            type: Number,
            required: true
        },
        metodoPago: {
            type: String,
            required: true
        },
        fechaPago: {
            type: Date,
            required: true
        }
    }]
});

module.exports = Mongoose.model("usuario", usuarioSchema);