const { Sequelize } = require('sequelize');
const {db} = require("../configs/database");

const { DataTypes } = Sequelize;

const Vendor = db.define('Vendor', {
  // Model attributes are defined here
  id_vendor: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  udcr: {
    type: DataTypes.DATE,
    allowNull: false
  },
  udcr: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: "vendor",
  createdAt: "udcr",
  updatedAt: "udch"
});

module.exports = Vendor;