// File model untuk tabel konfigurasi: app_configuration.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const AppConfig = sequelize.define(
  'AppConfig',
  {
      cancellation_timeout: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 172800, // Default: 2 days in seconds
      },
    },
    {
      sequelize,
      modelName: 'AppConfig',
      tableName: 'app_configurations',
    }
)

module.exports = {AppConfig}