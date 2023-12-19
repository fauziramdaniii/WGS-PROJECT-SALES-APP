const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

class User extends Model {}

User.init(
  {
    password: DataTypes.STRING,         // Consider using a more secure method for passwords (e.g., hashing)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,                  // Validate that it's a valid email address
      },
    },
    fullname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    google_id: DataTypes.STRING,
    roles: {
      type: DataTypes.STRING,
      defaultValue: 'user',            // Set a default value if applicable
    },
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    token: DataTypes.STRING,
    expiredToken: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    updatedAt: 'updatedAt',            // Specify the column name for updatedAt
    createdAt: 'createdAt',            // Specify the column name for createdAt
  }
);

module.exports = { User };
