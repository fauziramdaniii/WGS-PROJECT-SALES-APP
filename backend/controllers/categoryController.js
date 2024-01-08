// controllers/categoryController.js
const { Category } = require('../models/category');
const { validationResult } = require('express-validator');
const { logActivity } = require('../utils/logactivity')

getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    console.log(categories)
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

createCategory = async (req, res) => {
  const { name } = req.body;
  console.log(name)
  try {
    // Cari kategori berdasarkan nama
    const existingCategory = await Category.findOne({
      where: { name },
    });

    // Jika kategori sudah ada, kirim respons kesalahan
    if (existingCategory) {
      return res.json({error: 'Category is Already Exist'});
    }

    await logActivity({
        timestamp: new Date(),
        activityType: 'Add Category',
        user: 'id_user',
        details: 'Add Category',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
      });

    const newCategory = await Category.create({ name, image: req.file.filename  });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    await logActivity({
        timestamp: new Date(),
        activityType: 'Add Category',
        user: 'id_user',
        details: 'Add Category',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Failed',
      });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
   
    await category.update({ name, image: req.file.filename });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {getAllCategories, getCategoryById, createCategory,updateCategory, deleteCategory}