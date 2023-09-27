'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LateArrivalRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LateArrivalRequest.init({
    employee_id: DataTypes.INTEGER,
    request_date: DataTypes.DATE,
    requested_time: DataTypes.TIME,
    reason: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'late_arrival_requests',
    modelName: 'LateArrivalRequest',
  });
  return LateArrivalRequest;
};