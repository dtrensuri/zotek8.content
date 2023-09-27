'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.hasOne(models.User, { foreignKey: 'employee_id', targetKey: 'id', as: "user" });
      Employee.hasMany(models.TimeSheet, { foreignKey: 'employee_id', targetKey: 'id', as: "timeSheet" });
    }
  }
  Employee.init({
    address: {
      type: DataTypes.STRING,
      require: true,
    },
    phone: {
      type: DataTypes.STRING,
      require: true,
      unique: true,
    },
    gender: {
      type: DataTypes.TINYINT,
      require: true,
    },
    first_name: {
      type: DataTypes.STRING,
      require: true,
    },
    last_name: {
      type: DataTypes.STRING,
      require: true,
    },
    email: {
      type: DataTypes.STRING,
      require: true,
      unique: true,
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      require: true,
    },
    position: {
      type: DataTypes.STRING,
      require: true,
      defaultValue: 'Nhân viên',
    },
    // department: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 1,
    //   require: true,
    //   allowNull: false,
    // },
    employee_status: {
      type: DataTypes.INTEGER,
      defaultValue: '1',
      allowNull: true,
    },
    cccd: {
      type: DataTypes.STRING,
      require: true,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'employees',
    modelName: 'Employee',
  });
  return Employee;
};