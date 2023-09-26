const bcrypt = require('bcrypt');
const chance = require('chance');
const dotenv = require('dotenv');
const db = require('../../models/index');

dotenv.config();

const nchance = new chance();

const randomUsername = () => {
  return nchance.word() + nchance.integer({ min: 0, max: 9999 });
};

function generateFakeAccount(employee_id) {
  return {
    username: randomUsername(),
    password: bcrypt.hashSync('123456789', bcrypt.genSaltSync(10)), // Generate a salt for bcrypt
    email: nchance.email(),
    employee_id: employee_id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const accounts = []; // Change 'let account' to 'const accounts'

      const employees = await db.Employee.findAll({
        attributes: ['id'],
        raw: true,
      });

      for (const employee of employees) {
        const account = generateFakeAccount(employee.id); // Pass the employee id to the function
        accounts.push(account); // Push each account to the accounts array
      }

      await queryInterface.bulkInsert('users', accounts, {}); // Use 'accounts' array here
      console.log('Fake data has been seeded.');
    } catch (error) {
      console.error('Error seeding fake data:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('users', null, {});
      console.log('Fake data has been deleted.');
    } catch (error) {
      console.error('Error deleting fake data:', error);
    }
  },
};
