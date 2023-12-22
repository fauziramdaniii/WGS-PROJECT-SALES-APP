const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const { Product } = require('./product');
const { User } = require('./user');
const { Cart } = require('./cart');

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const Order = sequelize.define('Order', {
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: ['available'],
    validate: {
      isIn: [['booked', 'sold', 'canceled', 'available']],
    },
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Tambahkan foreign key ke user
Order.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

// Tambahkan foreign key ke product
Order.belongsTo(Product, { foreignKey: 'id_product', as: 'product' });

// Tambahkan relasi ke Cart
Order.hasMany(Cart, { foreignKey: 'id_order', as: 'carts' });

// Callback untuk mengurangi stok setelah pesanan dikonfirmasi
Order.afterUpdate(async (order) => {
  try {
    const previousStatus = order._previousDataValues.status;
    
    if (order.status.includes('booked') && order.changed('status') && previousStatus !== 'booked') {
      const product = await Product.findByPk(order.id_product);
      if (product) {
        const updatedStock = product.stock - order.quantity;
        await product.update({ stock: updatedStock });
      }
    } else if (order.status.includes('sold') && order.changed('status')) {
      const product = await Product.findByPk(order.id_product);
      if (product) {
        const updatedStock = product.stock - order.quantity;
        await product.update({ stock: updatedStock });
      }
    } else if (order.status.includes('canceled') && order.changed('status')) {
      const product = await Product.findByPk(order.id_product);
      if (product) {
        const updatedStock = product.stock + order.quantity;
        await product.update({ stock: updatedStock });
      }
    }
  } catch (error) {
    console.error('Error in Order.afterUpdate:', error);
  }
});

module.exports = { Order };
