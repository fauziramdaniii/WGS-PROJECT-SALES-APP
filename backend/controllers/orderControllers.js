const { Order } = require('../models/order');
const { Product } = require('../models/product');
const { Cart } = require('../models/cart');
const { Sequelize } = require('sequelize')
const { User } = require('../models/user')
const { logActivity } = require('../utils/logactivity')
const nodemailer = require('nodemailer')
const { AppConfig } = require('../models/appconfig')

const orderController = {

createOrder: async (req, res) => {
  try {
    const id_user = req.body.id_user;

    // Get all cart items for the user
    const cartItems = await Cart.findAll({
      where: {
        id_user,
      },
      include: [
        {
          model: Product,
          as: 'product',
        },
      ],
    });

    // Create an order for each cart item
    const orderPromises = cartItems.map(async (cartItem) => {
      const { id_product, quantity } = cartItem;
      const product = cartItem.product;

      // Check if there is enough stock for the order
      if (quantity > product.stock) {
        return res.status(400).json({ error: `Not enough stock for product: ${product.productName}` });
      }

      // Create order with status "booked"
      const order = await Order.create({
        id_user,
        id_product,
        quantity,
        total_amount: product.price * quantity,
        payment_method: req.body.payment_method,
        notes: req.body.notes,
        status: ['booked'],
      });

      // Update stock and set status to "booked" in the product table
      const updatedStock = product.stock - quantity;
      await product.update({ stock: updatedStock, status: ['booked'] });

      // Remove the item from the cart after creating the order
      await cartItem.destroy();

      // Set timeout for order cancellation
    const config = await AppConfig.findOne();
    const timeoutDuration = config ? config.cancellation_timeout : 172800000; // Default 2 days in milliseconds
    console.log(timeoutDuration);
    setTimeout(async () => {
      const canceledOrder = await Order.findByPk(order.id);

      if (canceledOrder && canceledOrder.status.includes('booked')) {
        await canceledOrder.update({ status: ['canceled'] });

        // Return product stock if the order is canceled
        const product = await Product.findByPk(canceledOrder.id_product);
        if (product) {
          const updatedStock = product.stock + canceledOrder.quantity;
          await product.update({ stock: updatedStock });
        }

        console.log('Order canceled after timeout:', canceledOrder.id);
      }
    }, timeoutDuration);

     await logActivity({
      timestamp: new Date(),
      activityType: 'Add Order',
      user: id_user,
      details: 'Add Order',
      ipAddress: req.ip,
      device: req.headers['user-agent'],
      status: 'Success',
    });
      // Send confirmation email to the user
      const user = await User.findByPk(id_user);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: 'fauziramdhan38@gmail.com', // Your email address
          pass: 'gskeghxoroktwmsg' // Your email password or an application-specific password
        },
        tls: {
          rejectUnauthorized: true
        }
      });

      const mailOptions = {
        from: 'framdhan26@gmail.com',
        to: user.email,
        subject: 'New Order Confirmation',
        html: `
          <p>Hello, ${user.fullname}</p>
          <p>Your order has been successfully placed with the following details:</p>
          <p>id order: <strong>${order.id}</strong></p>
          <p>Product: <strong>${product.name}</strong></p>
          <p>Quantity: <strong>${quantity}</strong></p>
          <p>Total Amount: <strong>${quantity * product.price}</strong></p>
          <p>Payment Method: <strong>${req.body.payment_method}</strong></p>
          <p>Notes: <strong>${req.body.notes || 'N/A'}</strong></p>
          <p>Status: <strong>booked</strong></p>
          <p>Please ensure to keep this information for your reference. Thank you for shopping with us.</p>
          <p>Best regards,</p>
          <p>Sales App WGS Bootcamp</p>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });

    
    // Wait for all order creation promises to complete
    await Promise.all(orderPromises);

    res.status(201).json({ message: 'Order created successfully.' });
  } catch (error) {
    console.error('Error creating order:', error);
      await logActivity({
      timestamp: new Date(),
      activityType: 'Add Order',
      user: id_user,
      details: 'Error creating order',
      ipAddress: req.ip,
      device: req.headers['user-agent'],
      status: 'Success',
    });
    res.status(500).json({ error: 'Internal Server Error' });
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

       await logActivity({
        timestamp: new Date(),
        activityType: 'Update Order',
        user: 'id_user',
        details: 'Update Order',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
      });

      res.status(200).json({ success: true, message: 'Order status updated successfully', data: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

 getOrder: async (req, res) => {
  try {
    const order = await Order.findAll({
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
      order: [['order_date', 'DESC']],
    });

    // Format the date in dd-mm-yyyy
    const formattedOrder = order.map((item) => {
      return {
        ...item.toJSON(),
        order_date: new Date(item.order_date).toLocaleDateString('en-GB'),
      };
    });

    res.status(200).json({ success: true, data: formattedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
},

   getOrderByUserId: async (req, res) => {
    try {
      const { id_user } = req.params;

      // Find orders by user ID
      const orders = await Order.findAll({
        where: { id_user },
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
        order: [['order_date', 'DESC']], // Order by date, adjust as needed
      });

      if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, error: 'Orders not found for the given user' });
      }

      res.status(200).json({ success: true, data: orders });
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
