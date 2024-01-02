const { Sequelize } = require('sequelize');
const {db} = require("../configs/database");

const { DataTypes } = Sequelize;

const Paket = db.define('Paket', {
  // Model attributes are defined here
  id_paket: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nama_paket: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_kategori_belanja: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_unit_sub: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tahun_anggaran: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tanggal_daftar_awal: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tanggal_daftar_akhir: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tanggal_eval_awal: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tanggal_eval_akhir: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tanggal_umum_paket: {
    type: DataTypes.DATE,
    allowNull: true
  },
  path: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: "Paket",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Paket;