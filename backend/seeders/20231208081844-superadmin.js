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
      roles: 'superadmin',
      address: '123 Main Street',
      city: 'Cityville',
      state: 'Stateville',
      country: 'Countryville',
      token: 'superadmin_token',
      expiredToken:  new Date(),
      // UpdatedAt: new Date(),
      createdAt:  new Date(),
    }], {});
      // Seeder for Admin
     await queryInterface.bulkInsert('Users', [{
       password: await bcrypt.hash('P@ssw0rd', 10),
       email: 'admin@example.com',
       fullname: 'Admin User',
       username: 'admin',
       roles: 'admin',
       address: '456 Main Street',
       city: 'Townsville',
       state: 'Statetown',
       country: 'Countrytown',
       token: 'user_token',
       expiredToken: new Date(),
       createdAt: new Date(),
       updatedAt: new Date(),
     }], {});


    // Seeder for Regular User
     await queryInterface.bulkInsert('Users', [{
       password: await bcrypt.hash('P@ssw0rd', 10),
       email: 'user@example.com',
       fullname: 'Regular User',
       username: 'regularuser',
       roles: 'user',
       address: '456 Main Street',
       city: 'Townsville',
       state: 'Statetown',
       country: 'Countrytown',
       token: 'user_token',
       expiredToken: new Date(),
       createdAt: new Date(),
       updatedAt: new Date(),
     }], {});
  },
  

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
