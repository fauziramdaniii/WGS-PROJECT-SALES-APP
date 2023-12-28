const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const LogActivity = sequelize.define(
  'LogActivity', // Model name
  {
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    activityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: DataTypes.STRING,
    details: DataTypes.TEXT,
    ipAddress: DataTypes.STRING,
    device: DataTypes.STRING,
    browser: DataTypes.STRING,
    status: DataTypes.STRING,
  }
);

module.exports = {LogActivity};
