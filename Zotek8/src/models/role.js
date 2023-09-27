'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Role.belongsToMany(models.Employee, {
            //     targetKey: 'employee_id', // Khóa trong mô hình Employee
            //     foreignKey: 'role_id', // Khóa trong mô hình Role
            //     through: 'roles_employees', // Tên bảng liên kết (bảng trung gian)
            //     as: 'users' // Bí danh để truy cập thông qua quan hệ
            // });
        }

    }
    Role.init({

        role_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {

        sequelize,
        timestamps: true,
        tableName: 'roles',
        modelName: 'Role',
    });
    return Role;
};