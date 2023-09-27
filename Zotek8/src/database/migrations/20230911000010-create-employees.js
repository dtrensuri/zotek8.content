'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // employee_id: {
      //   type: Sequelize.STRING,
      //   unique: true,
      // },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      gender: {
        type: Sequelize.TINYINT
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      hire_date: {
        type: Sequelize.DATEONLY,
      },
      position: {
        type: Sequelize.STRING,
        defaultValue: 'Nhân viên',
      },
      // department: {
      //   type: Sequelize.INTEGER,
      //   defaultValue: 1,
      //   allowNull: false,
      // },
      employee_status: {
        type: Sequelize.INTEGER,
        defaultValue: '1',
        allowNull: true,
      },
      cccd: {
        type: Sequelize.STRING,
        unique: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};