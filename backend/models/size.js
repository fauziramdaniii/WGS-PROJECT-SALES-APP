// models/size.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const { Product } = require('../models/product'); // Import model Product

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const Size = sequelize.define(
  'Size',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
  }
);

module.exports = { Size };
