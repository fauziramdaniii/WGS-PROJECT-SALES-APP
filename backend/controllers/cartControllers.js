// controllers/cartController.js
const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { User } = require('../models/user');
const { Order } = require('../models/order')
const { logActivity } = require('../utils/logactivity')
 
const cartController = {
 addToCart: async (req, res) => {
  try {
    const { id_user, id_product, quantity } = req.body;

    // Check if the product is already in the user's cart
    let cartItem = await Cart.findOne({
      where: {
        id_user,
        id_product,
      },
    });

    if (cartItem) {
      // If the product is already in the cart, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If the product is not in the cart, create a new cart item
      await Cart.create({
        id_user,
        id_product,
        quantity,
      });
    }

    res.status(201).json({ message: 'Product added to cart successfully.' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

  getAllCarts: async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { id_order: null },
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
