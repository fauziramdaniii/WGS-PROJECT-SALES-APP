'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Categories" ORDER BY id ASC;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const catId = (name) => categories.find(c => c.name === name)?.id;

    await queryInterface.bulkInsert('Products', [
      // Elektronik
      {
        id_category: catId('Elektronik'),
        name: 'Smartphone Android 5G',
        price: 3500000,
        image: 'image-1703336271003-1.jpeg',
        description: 'Smartphone flagship dengan layar AMOLED 6.5 inci, RAM 8GB, storage 256GB, dan baterai 5000mAh.',
        stock: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: catId('Elektronik'),
        name: 'Laptop Gaming 15 Inch',
        price: 12000000,
        image: 'image-1703337216998-2.jpeg',
        description: 'Laptop gaming dengan GPU RTX 3060, RAM 16GB DDR5, SSD 512GB, layar 144Hz Full HD.',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: catId('Elektronik'),
        name: 'TWS Earbuds Wireless',
        price: 450000,
        image: 'image-1703868720894-nillkin-case-1.jpg',
        description: 'Earbuds true wireless dengan Active Noise Cancellation, baterai 6 jam + case 24 jam.',
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Pakaian
      {
        id_category: catId('Pakaian'),
        name: 'Kaos Polos Premium Cotton',
        price: 85000,
        image: 'image-1704469747100-Tshirt.jpg',
        description: 'Kaos polos berbahan cotton combed 30s, adem dan nyaman dipakai sehari-hari.',
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: catId('Pakaian'),
        name: 'Jaket Windbreaker',
        price: 320000,
        image: 'image-1704469738181-hoddies.jpg',
        description: 'Jaket windbreaker anti angin dan water resistant, cocok untuk outdoor.',
        stock: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: catId('Pakaian'),
        name: 'Jaket The North Face',
        price: 750000,
        image: 'image-1704471293816-TNF.jpeg',
        description: 'Jaket outdoor The North Face, bahan fleece tebal, cocok untuk aktivitas hiking.',
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Makanan
      {
        id_category: catId('Makanan'),
        name: 'Kopi Arabika Specialty 250g',
        price: 95000,
        image: 'image-1703337647111-8.jpeg',
        description: 'Biji kopi arabika single origin dari Flores, proses natural, profil rasa fruity dan sweet.',
        stock: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: catId('Makanan'),
        name: 'Snack Granola Bar Oat',
        price: 35000,
        image: 'image-1703337566358-7.jpeg',
        description: 'Granola bar sehat berbahan oat, madu, dan kacang almond. Bebas pengawet.',
        stock: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Aksesoris
      {
        id_category: catId('Aksesoris'),
        name: 'Case HP Nillkin Premium',
        price: 120000,
        image: 'image-1703590882107-nillkin-case-1.jpg',
        description: 'Case handphone Nillkin berbahan frosted shield, slim dan anti sidik jari.',
        stock: 70,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: catId('Aksesoris'),
        name: 'Jam Tangan Digital Casual',
        price: 275000,
        image: 'image-1704470841471-dc.jpg',
        description: 'Jam tangan digital water resistant dengan strap silikon, display LED, dan alarm.',
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: catId('Aksesoris'),
        name: 'Tas Ransel Laptop 15"',
        price: 220000,
        image: 'image-1703335950136-3.jpeg',
        description: 'Ransel dengan kompartemen laptop 15 inch, bahan waterproof, kapasitas 20L.',
        stock: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Olahraga
      {
        id_category: catId('Olahraga'),
        name: 'Sepatu Running Pria',
        price: 480000,
        image: 'image-1704469728125-shoes.jpg',
        description: 'Sepatu lari ringan dengan sol EVA empuk, cocok untuk jogging dan olahraga ringan.',
        stock: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: catId('Olahraga'),
        name: 'Matras Yoga Anti-Slip 6mm',
        price: 150000,
        image: 'image-1704471345529-TNF.jpeg',
        description: 'Matras yoga TPE ramah lingkungan, ketebalan 6mm, permukaan anti-slip, berat ringan.',
        stock: 55,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
