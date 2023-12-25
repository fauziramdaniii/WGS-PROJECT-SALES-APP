const { Order } = require('../models/order');
const { Product } = require('../models/product');
const { Cart } = require('../models/cart');
const { Sequelize } = require('sequelize')

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { id_user, id_product, quantity, payment_method, notes } = req.body;

      // Dapatkan data produk
      const product = await Product.findByPk(id_product);
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }

      if (product.stock <= 0) {
        return res.status(404).json({ success: false, error: 'Stock Null' });
      }

      // Buat pesanan
      const order = await Order.create({
        id_user,
        id_product,
        quantity,
        total_amount: quantity * product.price,
        payment_method,
        notes,
        status: ['available'],
      });

      await order.update({ status: ['booked'] });

      // Hapus entri keranjang yang terkait dengan pesanan
      await Cart.destroy({ where: { id_user, id_product } });

      res.status(201).json({ success: true, data: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Lakukan validasi status yang diperbolehkan
      const allowedStatus = ['booked', 'sold', 'canceled'];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status' });
      }

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      // Update status
      await order.update({ status: [status] }); // Perubahan di sini, pastikan status dikirimkan dalam bentuk array

      res.status(200).json({ success: true, message: 'Order status updated successfully', data: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

 getOrderHeader: async (req, res) => {
  try {
    const ordersHeader = await Order.findAll({
      attributes: [
        'id_user',
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity'],
        [Sequelize.fn('SUM', Sequelize.col('total_amount')), 'total_amount'],
        'payment_method',
      ],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: [],
        },
      ],
      group: ['id_user', 'payment_method'],
    });

    res.status(200).json({ success: true, data: ordersHeader });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
},

getOrderedProducts: async (req, res) => {
  try {
    const orderedProducts = await Order.findAll({
      attributes: [
        'id',
        'id_user',
        'id_product',
        'order_date',
        'status',
        'total_amount',
        'quantity',
        'payment_method',
      ],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['name', 'price', 'image'],
        },
      ],
      order: [['id_user', 'ASC']],
    });

    res.status(200).json({ success: true, data: orderedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
},


  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the order by ID
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      // Delete the order
      await order.destroy();

      res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

};

module.exports = orderController;
