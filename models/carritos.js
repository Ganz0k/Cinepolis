'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carritos.belongsTo(models.Usuarios, { foreignKey: "id_usuario" });
    }
  }
  Carritos.init({
    id_usuario: DataTypes.INTEGER,
    boletos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carritos',
  });
  return Carritos;
};