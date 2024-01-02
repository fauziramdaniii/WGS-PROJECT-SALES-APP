// seeders/20220101000000-demo-app-config.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('app_configurations', [{
      cancellation_timeout: 172800, // Default: 2 days in seconds
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('app_configurations', null, {});
  },
};
