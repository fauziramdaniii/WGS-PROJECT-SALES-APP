const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config/config.json')
const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development'])

const ContactUs = sequelize.define(
  'ContactUs',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  }
)

module.exports = { ContactUs }
