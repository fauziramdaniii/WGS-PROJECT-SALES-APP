const express = require('express')
const router = express.Router()

const {
    countUser, 
    countCategory, 
    countOrder, 
    countProduct, 
    GetTotalAmountToday, 
    GetTotalAmountLastWeek, 
    GetTotalAmountLastMonth,
    GetTotalAmountLast3Months
    } = require('../controllers/dashboardContoller')

router.get('/dashboard', async (req, res) => {
    try {
        const userCount = await countUser();
        const orderCount = await countOrder()
        const categoryCount = await countCategory()
        const productCount = await countProduct()
        const countTotalOrderToday = await GetTotalAmountToday()
        const countTotalOrderLastWeek = await GetTotalAmountLastWeek()
        const countTotalOrderLastMonth = await GetTotalAmountLastMonth()
        const countTotalOrderLast3Month = await GetTotalAmountLast3Months()
        
        res.json({
            userCount,
            orderCount,
            categoryCount,
            productCount,
            countTotalOrderToday,
            countTotalOrderLastWeek,
            countTotalOrderLastMonth,
            countTotalOrderLast3Month
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router