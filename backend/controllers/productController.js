// controllers/productController.js
const { Product } = require('../models/product');
const { validationResult } = require('express-validator');

createProduct = async (req, res) => {
const { name, price, image, description, stock, id_category } = req.body;
  try {
    const newProduct = await Product.create({ name, price, image, description, stock, id_category });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {createProduct}

// Tambahkan fungsi lainnya seperti readProduct, updateProduct, deleteProduct
