// controllers/cartController.js
const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { User } = require('../models/user');

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

      res.status(201).json({ success: true, message: 'Cart created successfully', data: cart });

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
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  getCart: async (req, res) => {
    try {
      const carts = await Cart.findAll({
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['username', 'email'],
          },
        ],
      });

      res.status(200).json({ success: true, data: carts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  getCartById: async (req, res) => {
    try {
      const { id } = req.params;

      const cart = await Cart.findByPk(id, {
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['username', 'email'],
          },
        ],
      });

      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }

      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  getCartsByUserId: async (req, res) => {
    try {
      const { id_user } = req.params;

      const userCarts = await Cart.findAll({
        where: { id_user: id_user },
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['username', 'email'],
          },
        ],
      });

      res.status(200).json({ success: true, data: userCarts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  updateCart: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const cart = await Cart.findByPk(id);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }

      await cart.update({ quantity });

      res.status(200).json({ success: true, message: 'Cart updated successfully', data: cart });
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
