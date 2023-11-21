const Mongoose = require("mongoose");

const peliculaSchema = new Mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precioBoleto: {
        type: Number,
        required: true
    },
    imagen: {
        type: Buffer,
        required: true
    },
    horarios: [{
        type: String,
        required: true
    }],
    boletos: [{
        _id: {
            type: Mongoose.Schema.Types.ObjectId,
            required: true
        },
        idUsuario: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "usuario",
            required: false
        },
        asiento: {
            type: String,
            required: true
        },
        horario: {
            type: Date,
            required: true
        },
        estado: {
            type: String,
            required: true
        }
    }]
});

module.exports = Mongoose.model("pelicula", peliculaSchema);