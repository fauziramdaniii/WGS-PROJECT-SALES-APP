const { Op } = require('sequelize');
const Order = require('../models/order');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrderById = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findByPk(orderId);
        if (order) {
            res.status(200).json({ order });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createOrder = async (req, res) => {
    const { user_id, product_id, quantity, order_date, status, total_amount, payment_method, notes } = req.body;

    try {
        const order = await Order.create({
            user_id,
            product_id,
            quantity,
            order_date,
            status,
            total_amount,
            payment_method,
            notes,
        });

        res.status(201).json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const { user_id, product_id, quantity, order_date, status, total_amount, payment_method, notes } = req.body;

    try {
        const order = await Order.findByPk(orderId);
        if (order) {
            await order.update({
                user_id,
                product_id,
                quantity,
                order_date,
                status,
                total_amount,
                payment_method,
                notes,
            });
            res.status(200).json({ order });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findByPk(orderId);
        if (order) {
            await order.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
