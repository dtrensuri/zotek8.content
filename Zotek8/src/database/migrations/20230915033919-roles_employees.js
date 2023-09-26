'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('roles_employees', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('roles_employees',
      {
        fields: ['employee_id'],
        type: 'foreign key',
        name: 'PK_Employees_Role',
        references: {
          table: "employees",
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    )

    await queryInterface.addConstraint('roles_employees',
      {
        fields: ['role_id'],
        type: 'foreign key',
        name: 'PK_Role_Employees',
        references: {
          table: "roles",
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
