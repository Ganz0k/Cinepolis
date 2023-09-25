'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuarios.hasMany(models.Boletos, { foreignKey: "id_usuario" });
      Usuarios.hasMany(models.Pagos, { foreignKey: "id_usuario" });
      Usuarios.hasOne(models.Carritos, { foreignKey: "id_usuario" });
      Usuarios.hasOne(models.Administradores, { foreignKey: "id_usuario" });
      Usuarios.hasOne(models.Clientes, { foreignKey: "id_usuario" });
    }
  }
  Usuarios.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};