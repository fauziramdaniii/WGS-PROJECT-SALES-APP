const { ExpiredOrder } = require('../models/expiredorder');

// Create a new expired order
const createExpiredOrder = async (req, res) => {
  try {
    // Set the current date and time for the 'createdAt' and 'updatedAt' fields
    const currentDate = new Date();
    const expiredOrderData = { ...req.body, createdAt: currentDate, updatedAt: currentDate };

    const expiredOrder = await ExpiredOrder.create(expiredOrderData);
    res.status(201).json(expiredOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an expired order by ID
const updateExpiredOrder = async (req, res) => {
  try {
    const expiredOrder = await ExpiredOrder.findByPk(req.params.id);
    if (!expiredOrder) {
      res.status(404).json({ error: 'Expired Order not found' });
    } else {
      // Set the current date and time for the 'updatedAt' field
      const currentDate = new Date();
      await expiredOrder.update({ ...req.body, updatedAt: currentDate });

      res.status(200).json(expiredOrder);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllExpiredOrder = async (req, res) => {
  try {
    const expiredOrders = await ExpiredOrder.findAll();
    res.status(200).json(expiredOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createExpiredOrder,
  updateExpiredOrder,
  getAllExpiredOrder
};
