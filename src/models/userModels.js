const { Sequelize } = require('sequelize');
const {db} = require("../configs/database");

const { DataTypes } = Sequelize;

const Users = db.define('users', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  refresh_token: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Users;