'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('late_arrival_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER
      },
      request_date: {
        type: Sequelize.DATE
      },
      requested_time: {
        type: Sequelize.TIME
      },
      reason: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 3,
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
    await queryInterface.dropTable('late_arrival_requests');
  }
};