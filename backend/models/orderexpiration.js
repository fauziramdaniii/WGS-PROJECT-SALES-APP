// models/orderexpiration.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const { Order } = require('../models/order')
const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const OrderExpiration = sequelize.define('OrderExpiration', {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  expirationTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

OrderExpiration.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

module.exports = OrderExpiration;
