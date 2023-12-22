// models/cart.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const { Product } = require('../models/product');
const { User } = require('../models/user');
const { Order } = require('../models/order'); // Import the Order model

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const Cart = sequelize.define(
  'Cart',
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: 'Cart',
  }
);

Cart.belongsTo(Product, { as: 'product', foreignKey: 'id_product' });
Cart.belongsTo(User, { as: 'user', foreignKey: 'id_user' });

module.exports = { Cart };
