const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const {Product} = require('./product')
const {User} = require('./user')

const Order = sequelize.define('Order', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
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
});

// Tambahkan foreign key ke product dan user
Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Order;
