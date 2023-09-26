'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Holiday extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Holiday.init({
    holiday_date: DataTypes.DATE,
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'holidays',
    modelName: 'Holiday',
  });
  return Holiday;
};