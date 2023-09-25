'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administradores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Administradores.belongsTo(models.Usuarios, { foreignKey: "id_usuario" });
    }
  }
  Administradores.init({
    id_usuario: DataTypes.INTEGER,
    permisos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Administradores',
  });
  return Administradores;
};