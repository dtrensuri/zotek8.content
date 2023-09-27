const chance = require('chance');
const dotenv = require('dotenv');
const moment = require('moment');
const _ = require('lodash');

dotenv.config();
nchance = new chance();

'use strict';



function generateFakeEmployees() {

  return {
    first_name: nchance.name(),
    last_name: nchance.name(),
    email: nchance.email(),
    address: nchance.address(),
    gender: nchance.integer({ min: 0, max: 1 }),
    phone: nchance.phone(),
    // id_role: nchance.integer({ min: 1, max: 4 }),
    hire_date: new Date().getDate(),
    position: _.sample(['Nhân viên', 'Thực tập', 'DEV', 'BA', 'DA']),
    cccd: `0${nchance.integer({ min: 34200000000, max: 34999999999 })}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const fakeEmployees = Array.from({ length: 20 }, generateFakeEmployees);

      await queryInterface.bulkInsert('employees', fakeEmployees, {});
      console.log('Fake data has been seeded.');
    } catch (error) {
      console.error('Error seeding fake data:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
