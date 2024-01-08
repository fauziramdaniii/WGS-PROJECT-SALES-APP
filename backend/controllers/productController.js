// controllers/productController.js
const { Product } = require('../models/product');
const { validationResult } = require('express-validator');
const {Category} = require('../models/category')
const { logActivity } = require('../utils/logactivity')

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, image, description, stock, id_category } = req.body;
  try {

     const newProduct = await Product.create({
      name,
      price,
      description,
      stock,
      id_category,
      image: req.file.filename  // Assuming you use `multer` for file uploads
    });

    await logActivity({
        timestamp: new Date(),
        activityType: 'Add Product',
        user: 'id_user',
        details: 'Add Product',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'image', 'description', 'stock', 'id_category'], // Menentukan atribut yang ingin ditampilkan
      include: [{
        model: Category,
        as: 'category',
        attributes: ['name']
      }],
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, description, stock, id_category } = req.body;

  try {
    // Check if the category exists
    const categoryExists = await Category.findByPk(id_category);
    if (!categoryExists) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    // Update the product
    const updatedProduct = await Product.findByPk(id);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Perform the update
    await updatedProduct.update({
      name,
      price,
      // image: req.file.filename,
      image,
      description,
      stock,
      id_category,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: id,
      },
      
    });

    if (deletedProduct === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Kirim produk sebagai respons
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById
};
