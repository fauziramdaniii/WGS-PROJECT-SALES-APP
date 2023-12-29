// models/product.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const ExpiredOrder = sequelize.define(
  'ExpiredOrder',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    expiredOrder: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
  },
  {
    modelName: 'ExpiredOrder',
  }
);

module.exports = { ExpiredOrder };
