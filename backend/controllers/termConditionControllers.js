// controllers/termConditionController.js
const { TermCondition } = require('../models/termcondition');
const { validationResult } = require('express-validator');

const getAllTermConditions = async (req, res) => {
  try {
    const termConditions = await TermCondition.findAll();
    res.json(termConditions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTermConditionById = async (req, res) => {
  const { id } = req.params;
  try {
    const termCondition = await TermCondition.findByPk(id);
    if (!termCondition) {
      return res.status(404).json({ error: 'TermCondition not found' });
    }
    res.json(termCondition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTermCondition = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = req.body;

  try {
    const newTermCondition = await TermCondition.create({ title, content });
    res.status(201).json(newTermCondition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTermCondition = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const termCondition = await TermCondition.findByPk(id);
    if (!termCondition) {
      return res.status(404).json({ error: 'TermCondition not found' });
    }

    termCondition.title = title;
    termCondition.content = content;
    await termCondition.save();

    res.json(termCondition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTermCondition = async (req, res) => {
    const { id } = req.params

    const termCondition = await TermCondition.findByPk(id);
      if (!termCondition) {
        return res.status(404).json({ success: false, error: 'Term Condition Not found' });
      }

      // Delete the termCondition
      await termCondition.destroy();

      res.status(200).json({ success: true, message: 'Order Deleted Successfully' });
}


module.exports = {
  getAllTermConditions,
  getTermConditionById,
  createTermCondition,
  updateTermCondition,
  deleteTermCondition
};
