const db = require('../../models/index');
const _ = require('lodash');
const Chance = require('chance');
const moment = require('moment');

'use strict';

const nchane = new Chance(); // Lưu ý viết đúng tên lớp Chance

const createTimeSeed = async (user, dayAgo) => {
  const listTimeSheets = [];
  for (let day = 0; day <= dayAgo; day++) {
    let time_in = `${nchane.integer({ max: 8, min: 6 })}:${nchane.integer({ max: 60, min: 0 })}`;
    let time_out = `${nchane.integer({ max: 20, min: 17 })}:${nchane.integer({ max: 60, min: 0 })}`;
    listTimeSheets.push({
      employee_id: user.id,
      date: moment().add(-day, 'days').format('YYYY-MM-DD'),
      time_in: time_in,
      time_out: time_out,
      createdAt: new Date(time_in),
      updatedAt: new Date(time_out)
    });
  }
  return listTimeSheets;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const timeSheets = [];
      const users = await db.Employee.findAll();

      for (const user of users) {
        const time = await createTimeSeed(user, [60]);
        timeSheets.push(...time);
      }

      await queryInterface.bulkInsert('time_sheets', timeSheets, {});
    } catch (error) {
      console.error('Error seeding check_in_out:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('check_in_out', null, {});
    } catch (error) {
      console.error('Error reverting check_in_out seed:', error);
    }
  }
};
