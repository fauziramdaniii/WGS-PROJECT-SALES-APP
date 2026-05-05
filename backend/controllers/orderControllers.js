const { Order } = require('../models/order');
const { Product } = require('../models/product');
const { Cart } = require('../models/cart');
const { Sequelize } = require('sequelize')
const { User } = require('../models/user')
const { logActivity } = require('../utils/logactivity')
const nodemailer = require('nodemailer')
const { AppConfig } = require('../models/appconfig')
const { Op } = require('sequelize');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'fauziramdhan38@gmail.com',
    pass: 'gskeghxoroktwmsg'
  },
  tls: { rejectUnauthorized: true }
});

const orderController = {

  createOrder: async (req, res) => {
    const { id_user, payment_method, notes, recipient_name, recipient_phone } = req.body;
    try {
      const cartItems = await Cart.findAll({
        where: { id_user },
        include: [{ model: Product, as: 'product' }],
      });

      if (!cartItems.length) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      const config = await AppConfig.findOne();
      const timeoutDuration = config ? config.cancellation_timeout * 1000 : 172800000;

      const orderPromises = cartItems.map(async (cartItem) => {
        const { id_product, quantity } = cartItem;
        const product = cartItem.product;

        if (quantity > product.stock) {
          throw new Error(`Stok tidak cukup untuk produk: ${product.name}`);
        }

        const order = await Order.create({
          id_user,
          id_product,
          quantity,
          total_amount: product.price * quantity,
          payment_method,
          notes,
          recipient_name,
          recipient_phone,
          status: ['pending_payment'],
        });

        const updatedStock = product.stock - quantity;
        await product.update({ stock: updatedStock });

        await cartItem.destroy();

        // Auto-cancel hanya jika masih pending_payment setelah timeout
        setTimeout(async () => {
          const canceledOrder = await Order.findByPk(order.id);
          if (canceledOrder && canceledOrder.status.includes('pending_payment')) {
            await canceledOrder.update({ status: ['canceled'] });
            const prod = await Product.findByPk(canceledOrder.id_product);
            if (prod) await prod.update({ stock: prod.stock + canceledOrder.quantity });
            console.log('Order auto-canceled after timeout:', canceledOrder.id);
          }
        }, timeoutDuration);

        return { order, product };
      });

      const createdOrders = await Promise.all(orderPromises);

      // Kirim email invoice
      const user = await User.findByPk(id_user);
      if (user) {
        const itemsHtml = createdOrders.map(({ order, product }) => `
          <tr>
            <td>${product.name}</td>
            <td style="text-align:center">${order.quantity}</td>
            <td style="text-align:right">Rp ${order.total_amount.toLocaleString('id-ID')}</td>
          </tr>
        `).join('');

        const totalAll = createdOrders.reduce((sum, { order }) => sum + order.total_amount, 0);

        const mailOptions = {
          from: 'framdhan26@gmail.com',
          to: user.email,
          subject: 'Invoice Pemesanan — Sales App WGS',
          html: `
            <h3>Halo, ${user.fullname}!</h3>
            <p>Pesanan Anda berhasil dibuat. Berikut detail pesanan:</p>
            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
              <thead style="background:#f0f0f0">
                <tr><th>Produk</th><th>Qty</th><th>Total</th></tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
              <tfoot>
                <tr><td colspan="2"><strong>Total Pembayaran</strong></td><td style="text-align:right"><strong>Rp ${totalAll.toLocaleString('id-ID')}</strong></td></tr>
              </tfoot>
            </table>
            <p><strong>Metode Pembayaran:</strong> ${payment_method === 'transfer' ? 'Transfer Bank' : 'Tunai (Cash)'}</p>
            ${payment_method === 'transfer' ? '<p>Silakan upload bukti pembayaran di halaman <strong>My Order</strong> untuk memproses pesanan Anda.</p>' : ''}
            <p><strong>Penerima:</strong> ${recipient_name || user.fullname} ${recipient_phone ? `(${recipient_phone})` : ''}</p>
            <p>Terima kasih telah berbelanja!</p>
            <p><em>Sales App — WGS Bootcamp</em></p>
          `
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) console.error('Email error:', err);
          else console.log('Email sent:', info.response);
        });
      }

      await logActivity({
        timestamp: new Date(),
        activityType: 'Add Order',
        user: id_user,
        details: `Order created (${payment_method})`,
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
      });

      res.status(201).json({ message: 'Order berhasil dibuat.' });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  },

  uploadPaymentProof: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ error: 'Order tidak ditemukan' });
      if (!order.status.includes('pending_payment')) {
        return res.status(400).json({ error: 'Bukti bayar hanya bisa diupload saat status pending_payment' });
      }
      if (!req.file) return res.status(400).json({ error: 'File tidak ditemukan' });

      await order.update({ payment_proof: req.file.filename });
      res.status(200).json({ message: 'Bukti pembayaran berhasil diupload', filename: req.file.filename });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  cancelOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ error: 'Order tidak ditemukan' });
      if (!order.status.includes('pending_payment')) {
        return res.status(400).json({ error: 'Order hanya bisa dibatalkan saat status masih pending_payment' });
      }

      await order.update({ status: ['canceled'] });
      const product = await Product.findByPk(order.id_product);
      if (product) await product.update({ stock: product.stock + order.quantity });

      res.status(200).json({ message: 'Order berhasil dibatalkan' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const allowedStatus = ['pending_payment', 'confirmed', 'ready_to_pickup', 'sold', 'canceled'];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ success: false, error: 'Status tidak valid' });
      }

      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ success: false, error: 'Order tidak ditemukan' });

      const prevStatus = order.status[0];
      await order.update({ status: [status] });

      // Kembalikan stok jika admin cancel dari status confirmed / ready_to_pickup
      if (status === 'canceled' && ['confirmed', 'ready_to_pickup'].includes(prevStatus)) {
        const product = await Product.findByPk(order.id_product);
        if (product) await product.update({ stock: product.stock + order.quantity });
      }

      await logActivity({
        timestamp: new Date(),
        activityType: 'Update Order',
        user: order.id_user || 'id_user',
        details: `Status diubah: ${prevStatus} → ${status}`,
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
      });

      res.status(200).json({ success: true, message: 'Status order berhasil diupdate', data: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  getOrder: async (req, res) => {
    try {
      const order = await Order.findAll({
        attributes: ['id', 'id_user', 'id_product', 'order_date', 'status', 'total_amount', 'quantity', 'payment_method', 'recipient_name', 'recipient_phone', 'payment_proof', 'notes'],
        include: [{ model: Product, as: 'product', attributes: ['name', 'price', 'image'] }],
        order: [['order_date', 'DESC']],
      });

      const formattedOrder = order.map(item => ({
        ...item.toJSON(),
        order_date: new Date(item.order_date).toLocaleDateString('en-GB'),
      }));

      res.status(200).json({ success: true, data: formattedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  getOrderByUserId: async (req, res) => {
    try {
      const { id_user } = req.params;
      const orders = await Order.findAll({
        where: { id_user },
        attributes: ['id', 'id_user', 'id_product', 'order_date', 'status', 'total_amount', 'quantity', 'payment_method', 'recipient_name', 'recipient_phone', 'payment_proof', 'notes'],
        include: [{ model: Product, as: 'product', attributes: ['name', 'price', 'image'] }],
        order: [['order_date', 'DESC']],
      });

      if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, error: 'Order tidak ditemukan untuk user ini' });
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
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ success: false, error: 'Order tidak ditemukan' });
      await order.destroy();
      res.status(200).json({ success: true, message: 'Order berhasil dihapus' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
};

module.exports = orderController;
