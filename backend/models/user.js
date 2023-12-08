//models/user

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  User.init({
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
    expired_token: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
