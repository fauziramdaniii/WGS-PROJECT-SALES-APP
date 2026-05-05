'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Elektronik',
        image: 'image-1703337906387-11.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pakaian',
        image: 'image-1704469747100-Tshirt.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Makanan',
        image: 'image-1703337773917-10.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aksesoris',
        image: 'image-1703590882107-nillkin-case-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Olahraga',
        image: 'image-1704469728125-shoes.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
