const { DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'appdb',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'example',
  {
    host: process.env.DB_HOST || 'db',
    dialect: 'mysql',
  }
);

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = { User, sequelize };
