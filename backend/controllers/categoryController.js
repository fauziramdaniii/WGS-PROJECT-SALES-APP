// controllers/categoryController.js
const { Category } = require('../models/category');
const { validationResult } = require('express-validator');

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

    // Jika kategori belum ada, buat dan kirim respons berhasil
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
   
    await category.update({ name });
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