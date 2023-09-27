'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employee' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      require: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      require: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
      },
    },
    user_status: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      allowNull: true,
    },
  }, {

    sequelize,
    timestamps: true,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};