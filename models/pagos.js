'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pagos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pagos.belongsTo(models.Usuarios, { foreignKey: "id_usuario" });
    }
  }
  Pagos.init({
    id_usuario: DataTypes.INTEGER,
    monto: DataTypes.DECIMAL,
    metodo_pago: DataTypes.STRING,
    fecha_pago: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pagos',
  });
  return Pagos;
};