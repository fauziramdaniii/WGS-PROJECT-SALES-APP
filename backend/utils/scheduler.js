// scheduler.js
const cron = require('node-cron');
const { Op } = require('sequelize');
const { Order } = require('../models/order')
const { Product } = require('../models/product'); // Sesuaikan dengan lokasi model Anda

cron.schedule('*/5 * * * *', async () => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const bookedOrders = await Order.findAll({
      where: {
        status: ['booked'],
        order_date: { [Op.lte]: fiveMinutesAgo },
      },
    });

    // Batalkan pesanan yang sudah melewati batas waktu
    for (const order of bookedOrders) {
      await order.update({ status: ['canceled'] });

      // Kembalikan stok ke produk karena pesanan dibatalkan
      const product = await Product.findByPk(order.id_product);
      if (product) {
        const updatedStock = product.stock + order.quantity;
        await product.update({ stock: updatedStock });
      }
    }

    console.log('Auto-canceled orders:', bookedOrders.map(order => order.id));
  } catch (error) {
    console.error('Error in auto-cancel cron job:', error);
  }
});

// Export agar bisa digunakan di aplikasi
module.exports = cron;

