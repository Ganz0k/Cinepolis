const Mongoose = require("mongoose");
require("dotenv").config({ path: "../variables.env" });

const config = {
    url: process.env.URL_MONGO || "mongodb://127.0.0.1:27017/cinepolis",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

function conectar() {
    return Mongoose.connect(config.url, config.options);
}

function desconectar() {
    return Mongoose.disconnect();
}

module.exports = { conectar, desconectar };