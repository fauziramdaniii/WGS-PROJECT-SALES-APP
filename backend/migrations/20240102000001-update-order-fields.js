'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'recipient_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'recipient_phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'payment_proof', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Ubah tipe status agar support nilai baru
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: ['pending_payment'],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'recipient_name');
    await queryInterface.removeColumn('Orders', 'recipient_phone');
    await queryInterface.removeColumn('Orders', 'payment_proof');
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: ['available'],
    });
  },
};
