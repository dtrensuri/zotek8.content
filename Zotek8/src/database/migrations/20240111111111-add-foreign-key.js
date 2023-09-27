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
    console.log('Creating 1')
    await queryInterface.addConstraint('users', {
      fields: ['employee_id'],
      type: 'foreign key',
      name: 'PK_Users',
      references: {
        table: 'employees',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    console.log('Creating 2')
    await queryInterface.addConstraint('time_sheets', {
      fields: ['employee_id'],
      type: 'foreign key',
      name: 'PK_Time_Sheets',
      references: {
        table: "employees",
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    console.log('Creating 3')
    await queryInterface.addConstraint('refresh_token', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'PK_Refresh_Token',
      references: {
        table: "users",
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('employee_shifts', {
      fields: ['employee_id'],
      type: 'foreign key',
      name: 'PK_EmployeeShifts_Employee',
      references: {
        table: "employees",
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('employee_shifts', {
      fields: ['shift_id'],
      type: 'foreign key',
      name: 'PK_EmployeeShifts_Shift',
      references: {
        table: "shifts",
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('late_arrival_requests', {
      fields: ['employee_id'],
      type: 'foreign key',
      name: 'PK_LateArrivalRequest_Employees',
      references: {
        table: "employees",
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('early_departure_requests', {
      fields: ['employee_id'],
      type: 'foreign key',
      name: 'PK_LateDepartureRequests_Employees',
      references: {
        table: "employees",
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('leave_requests', {
      fields: ['employee_id'],
      type: 'foreign key',
      name: 'PK_LeaverRequests_Employees',
      references: {
        table: "employees",
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // await queryInterface.addConstraint('employees', {
    //   fields: ['role_id'],
    //   type: 'foreign key',
    //   name: 'PK_LeaverRequests_Employees',
    //   references: {
    //     table: "employees",
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });


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
