// controllers/productController.js
const { Product } = require('../models/product');
const { validationResult } = require('express-validator');
const {Category} = require('../models/category')
// Create a new product
const createProduct = async (req, res) => {
  const { name, price, image, description, stock, id_category } = req.body;
  try {
    // Check if the category exists
    // const categoryExists = await Category.findByPk(id_category);
    // if (!categoryExists) {
    //   return res.status(400).json({ error: 'Category Doesnt Exists' });
    // }

     const newProduct = await Product.create({
      name,
      price,
      description,
      stock,
      id_category,
      image: req.file.filename  // Assuming you use `multer` for file uploads
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
      include: [{
        model: Category,
        as: 'category',
        attributes: ['name']
      }]
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
  console.log(id);
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


module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
