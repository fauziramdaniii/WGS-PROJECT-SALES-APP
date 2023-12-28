const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const TermCondition = sequelize.define(
  'TermCondition',{
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
     content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  })

module.exports = { TermCondition }