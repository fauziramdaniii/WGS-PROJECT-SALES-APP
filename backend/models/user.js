const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('../config/config.json')

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development'])

class User extends Model {}

User.init(
  {
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    google_id: DataTypes.STRING,
    roles: DataTypes.STRING,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    token: DataTypes.STRING,
    expiredToken: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true
  }
);

module.exports={User};