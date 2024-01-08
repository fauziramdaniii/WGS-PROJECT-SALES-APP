const { User } = require('../models/user')
const { Order } = require('../models/order')
const { Category } = require('../models/category')
const { Product } = require('../models/product')
const { Sequelize } = require('sequelize')

const countUser = async () => {
    try {
        const userCount = await User.count();
        return userCount;
    } catch (error) {
        console.error('Error counting users:', error);
        throw error;
    }
};

const countOrder = async () => {
    try {
        const orderCount = await Order.count();
        return orderCount;
    } catch (error) {
        console.error('Error counting users:', error);
        throw error;
    }
};

const countCategory = async () => {
    try {
        const categoryCount = await Category.count();
        return categoryCount;
    } catch (error) {
        console.error('Error counting users:', error);
        throw error;
    }
};

const countProduct = async () => {
    try {
        const productCount = await Product.count();
        return productCount;
    } catch (error) {
        console.error('Error counting users:', error);
        throw error;
    }
};

const GetTotalAmountToday = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day

        console.log(today);
        const totalAmountToday = await Order.sum('total_amount', {
            where: {
                order_date: {
                    [Sequelize.Op.gte]: today,
                },
            },
        });
        return totalAmountToday || 0; // Return 0 if no sales for today
    } catch (error) {
        console.error('Error getting total amount for today:', error);
        throw error;
    }
};

const GetTotalAmountLastWeek = async () => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        lastWeek.setHours(0, 0, 0, 0);
        console.log(lastWeek);
        const totalAmountLastWeek = await Order.sum('total_amount', {
            where: {
                order_date: {
                    [Sequelize.Op.gte]: lastWeek,
                },
            },
        });

        return totalAmountLastWeek || 0;
    } catch (error) {
        console.error('Error getting total amount for last week:', error);
        throw error;
    }
};

const GetTotalAmountLastMonth = async () => {
    try {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        lastMonth.setHours(0, 0, 0, 0);
        console.log(lastMonth);
        const totalAmountLastMonth = await Order.sum('total_amount', {
            where: {
                order_date: {
                    [Sequelize.Op.gte]: lastMonth,
                },
            },
        });

        return totalAmountLastMonth || 0;
    } catch (error) {
        console.error('Error getting total amount for last month:', error);
        throw error;
    }
};

const GetTotalAmountLast3Months = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const last3Months = new Date();
        last3Months.setMonth(last3Months.getMonth() - 3);
        last3Months.setHours(0, 0, 0, 0);

        const totalAmountLast3Months = await Order.findAll({
            attributes: [
                [Sequelize.fn('date_trunc', 'month', Sequelize.col('order_date')), 'month'],
                [Sequelize.fn('sum', Sequelize.col('total_amount')), 'total_amount'],
            ],
            where: {
                order_date: {
                    [Sequelize.Op.between]: [last3Months, today],
                },
            },
            group: ['month'],
            order: [[Sequelize.fn('date_trunc', 'month', Sequelize.col('order_date')), 'DESC']], // Order by month in descending order
            raw: true,
        });

        return totalAmountLast3Months.map((entry) => ({
            month: new Date(entry.month).toLocaleString('en-US', { month: 'long' }),
            total_amount: entry.total_amount || 0,
        }));
    } catch (error) {
        console.error('Error getting total amount for last 3 months:', error);
        throw error;
    }
};



module.exports = {
    countUser,
    countOrder,
    countCategory,
    countProduct,
    GetTotalAmountToday,
    GetTotalAmountLastWeek,
    GetTotalAmountLastMonth,
    GetTotalAmountLast3Months,
}