'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peliculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Peliculas.hasMany(models.Boletos, { foreignKey: "id_pelicula" });
    }
  }
  Peliculas.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio_boleto: DataTypes.DECIMAL,
    imagen: DataTypes.STRING,
    horarios: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Peliculas',
  });
  return Peliculas;
};