// controllers/cartController.js
const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { User } = require('../models/user');
const { Order } = require('../models/order')
 
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

      // Keluar dari fungsi setelah mengirim respon
      return res.status(201).json({
        success: true,
        message: 'Cart created successfully',
        data: { cart, product: productInfo, user: userInfo },
      });
    } catch (error) {
      console.error(error);
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

      res.status(200).json({ success: true, message: 'Cart deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
};

module.exports = cartController;
