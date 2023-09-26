'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeSheets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TimeSheets.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employee' });
    }
  }
  TimeSheets.init({
    employee_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time_in: DataTypes.TIME,
    time_out: DataTypes.TIME
  }, {
    sequelize,
    tableName: 'time_sheets',
    modelName: 'TimeSheet',
  });
  return TimeSheets;
};