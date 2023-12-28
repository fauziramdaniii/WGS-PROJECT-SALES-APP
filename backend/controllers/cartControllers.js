// controllers/cartController.js
const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { User } = require('../models/user');
const { Order } = require('../models/order')
const { logActivity } = require('../utils/logactivity')
 
const cartController = {
    createCart: async (req, res) => {
    try {
      const { quantity } = req.body;
      const id_user = req.body.id_user; // Assuming user ID is available in the request
      const id_product = req.body.id_product; // Assuming product ID is available in the request

      const cart = await Cart.create({
        quantity,
        id_user,
        id_product,
      });

      // Setelah membuat keranjang, cek apakah ada pesanan yang sesuai kriteria
      const existingOrder = await Order.findOne({
        where: {
          id_user: id_user,
          id_product: id_product,
          status: ['available'],
        },
      });

      if (existingOrder) {
        // Jika pesanan yang sesuai ditemukan, update ID pesanan pada keranjang
        await Cart.update({ id_order: existingOrder.id }, { where: { id: cart.id } });
      }

      // Ambil informasi produk dan pengguna terkait
      const productInfo = await Product.findByPk(id_product, { attributes: ['name', 'price', 'image'] });
      const userInfo = await User.findByPk(id_user, { attributes: ['username', 'email'] });


        await logActivity({
        timestamp: new Date(),
        activityType: 'Add Cart',
        user: id_user,
        details: 'Add Cart',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
      });

      // Keluar dari fungsi setelah mengirim respon
      return res.status(201).json({
        success: true,
        message: 'Cart created successfully',
        data: { cart, product: productInfo, user: userInfo },
      });
    } catch (error) {
      console.error(error);

      await logActivity({
      timestamp: new Date(),
      activityType: 'Internal Server Error',
      details: error.message,
      ipAddress: req.ip,
      device: req.headers['user-agent'],
      status: 'Failed',
    });
      // Mengirim respon dalam blok catch, pastikan untuk keluar dari fungsi setelah itu
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  getCartByUserId: async (req, res) => {
    try {
      const { id } = req.params; // Dapatkan ID pengguna dari parameter URL atau dari mana pun yang sesuai dengan struktur endpoint Anda
      const cartItems = await Cart.findAll({
        where: { id_user: id, id_order: null },
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
        ],
      });

      res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;

      const cart = await Cart.findByPk(id);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }

      await cart.destroy();

      await logActivity({
        timestamp: new Date(),
        activityType: 'Delete Cart',
        user: cart.id_user,
        details: 'Delete Cart',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
      });

      res.status(200).json({ success: true, message: 'Cart deleted successfully' });
    } catch (error) {
      console.error(error);

       await logActivity({
        timestamp: new Date(),
        activityType: 'Delete Cart',
        user: 'id_user',
        details: error,
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Failed',
      });
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
};

module.exports = cartController;
