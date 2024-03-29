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
      const product = await Product.findByPk(id_product);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      let cartItem = await Cart.findOne({
        where: {
          id_user,
          id_product,
        },
      });

      if (cartItem) {
        // If the product is already in the cart, update the quantity
        cartItem.quantity += quantity;

        // Check if the updated quantity exceeds available stock
        if (cartItem.quantity > product.stock) {
          return res.status(400).json({ error: 'Stock is Not Enough' });
        }

        if (cartItem.quantity >= 5) {
          return res.status(400).json({ error: 'cart max to 5 of the same item' });
        }

        await cartItem.save();
      } else {
        // If the product is not in the cart, create a new cart item
        // Check if the requested quantity exceeds available stock
        if (quantity > product.stock) {
          return res.status(400).json({ error: 'Insufficient stock' });
        }

        await Cart.create({
          id_user,
          id_product,
          quantity,
        });
      }

      await logActivity({
        timestamp: new Date(),
        activityType: 'Delete Cart',
        user: id_user,
        details: 'Delete Cart',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
      });

      return res.status(201).json({ message: 'Product added to cart successfully.' });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
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
        user: cart.id_user || 'id_user',
        details: error,
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Failed',
      });
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  incrementCartItem: async (req, res) => {
    try {
      const { id } = req.params;
      const cartItem = await Cart.findByPk(id);

      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      const product = await Product.findByPk(cartItem.id_product);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Increment the quantity
      cartItem.quantity += 1;

      // Check if the updated quantity exceeds available stock
      if (cartItem.quantity > product.stock) {
        return res.status(400).json({ error: 'Stock is Not Enough' });
      }

      if (cartItem.quantity > 5) {
        return res.status(400).json({ error: 'Cart maxed to 5 of the same item' });
      }

      await cartItem.save();

      await logActivity({
        timestamp: new Date(),
        activityType: 'Increment Cart Item',
        user: cartItem.id_user,
        details: `Incremented quantity for product ${cartItem.id_product}`,
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
      });

      return res.status(200).json({ success: true, message: 'Cart item quantity incremented successfully.' });
    } catch (error) {
      console.error('Error incrementing cart item quantity:', error);
      await logActivity({
        timestamp: new Date(),
        activityType: 'Increment Cart Item',
        user: cartItem.id_user || 'id_user', // Replace with actual user ID or some identifier
        details: error.message || 'Internal Server Error',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Failed',
      });
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  decrementCartItem: async (req, res) => {
    try {
      const { id } = req.params;
      const cartItem = await Cart.findByPk(id);

      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      const product = await Product.findByPk(cartItem.id_product);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Decrement the quantity
      cartItem.quantity -= 1;

      // Check if the updated quantity is less than 1, remove the item from the cart
      if (cartItem.quantity < 1) {
        await cartItem.destroy();
      } else {
        await cartItem.save();
      }

      await logActivity({
        timestamp: new Date(),
        activityType: 'Decrement Cart Item',
        user: cartItem.id_user,
        details: `Decremented quantity for product ${cartItem.id_product}`,
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
      });

      return res.status(200).json({ success: true, message: 'Cart item quantity decremented successfully.' });
    } catch (error) {
      console.error('Error decrementing cart item quantity:', error);
      await logActivity({
        timestamp: new Date(),
        activityType: 'Decrement Cart Item',
        user: cartItem.id_user || 'id_user', // Replace with actual user ID or some identifier
        details: error.message || 'Internal Server Error',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Failed',
      });
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

};

module.exports = cartController;
