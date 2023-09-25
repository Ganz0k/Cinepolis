'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boletos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Boletos.belongsTo(models.Peliculas, { foreignKey: "id_pelicula" });
      Boletos.belongsTo(models.Usuarios, { foreignKey: "id_usuario" });
    }
  }
  Boletos.init({
    id_pelicula: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    asiento: DataTypes.STRING,
    horario: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Boletos',
  });
  return Boletos;
};