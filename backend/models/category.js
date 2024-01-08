const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);
const {Product} = require('./product')

const Category = sequelize.define(
  'Category',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
  },
  {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
  }
);

// Establish the one-to-many relationship with Product
Category.hasMany(Product, { foreignKey: "id", as: 'products' });
Product.belongsTo(Category, { foreignKey: "id_category", as: 'category' });

module.exports = { Category };