'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shifts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shifts.init({
    shift_name: DataTypes.STRING,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    log: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'shifts',
    modelName: 'Shift',
  });
  return Shifts;
};