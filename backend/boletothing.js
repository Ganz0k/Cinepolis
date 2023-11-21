// const db = require("./config/db");
// const Boleto = require("./models/boleto");
// const BoletoDAO = require("./dataAccess/boletoDAO");

// db.conectar()
//     .then(async () => {
//         const horario = new Date();
//         horario.setHours(12, 0, 0);
//         const boleto = new Boleto(undefined, undefined, "A8", horario, "Pendiente");

//         const b = await BoletoDAO.crearBoleto("65596cb7927a0088310c986a", boleto);

//         console.log(b.horario);
//         console.log(b.horario.toLocaleString());
//     })
//     .catch(err => {
//         console.error("Error en las pruebas: ", err);
//     });

const fecha = new Date();
fecha.setHours(12, 0, 0);
const fechaBien = fecha.toLocaleString().split(", ");

console.log(fecha);
console.log(fechaBien);

for (let i = 0; i < fechaBien.length; i++) {
    console.log(fechaBien[i]);
}

let horario = "12:00";
horario += ":00";

console.log(horario);