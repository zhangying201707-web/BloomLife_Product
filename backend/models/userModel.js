const { DataTypes, Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const defaultStorage =
  process.env.NODE_ENV === 'production' ? '/tmp/app.sqlite' : path.join(__dirname, '..', 'data', 'app.sqlite');
const storagePath = process.env.DB_STORAGE || defaultStorage;
fs.mkdirSync(path.dirname(storagePath), { recursive: true });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false,
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { User, sequelize };
