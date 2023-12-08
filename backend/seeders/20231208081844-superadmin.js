//seeders/superadmin
'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Users', [{
      password: await bcrypt.hash('P@ssw0rd', 10),
      email: 'superadmin@example.com',
      fullname: 'Super Admin',
      username: 'superadmin',
      roles: 'admin',
      address: '123 Main Street',
      city: 'Cityville',
      state: 'Stateville',
      country: 'Countryville',
      token: 'superadmin_token',
      expired_token:  new Date(),
      created_at:  new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
