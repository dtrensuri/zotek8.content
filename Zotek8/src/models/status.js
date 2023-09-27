'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Status.be(models.Employee, { foreignKey: 'employee_status' });
      // Status.hasMany(models.EmployeeShifts, { foreignKey: 'employee_shift_status' });
    }
  }
  Status.init({
    id: {
      require: true,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      require: true,
    },
    description: {
      type: DataTypes.STRING,
      require: true,
    },
  }, {
    sequelize,
    tableName: 'statuses',
    modelName: 'Status',
  });
  return Status;
};