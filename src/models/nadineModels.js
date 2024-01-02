const { Sequelize } = require('sequelize');
const { dbNadine } = require("../configs/database");

const { DataTypes } = Sequelize;

const NomorSurat = dbNadine.define('nomor_surat', {
  id_nomor: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  aplikasi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nomor_jadi: {
    type: DataTypes.STRING,
  },
  seq_nomor: {
    type: DataTypes.INTEGER(11),
  },
  nomor: {
    type: DataTypes.STRING,
  },
  sifat_surat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_surat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_jenis_nd: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nama_jenis_nd: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_jenis_surat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nama_jenis_surat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_tuton: {
    type: DataTypes.INTEGER(11),
  },
  perihal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tanggal_nomor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_klasifikasi: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  kode_klasifikasi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nama_klasifikasi: {
    type: DataTypes.STRING,
  },
  id_sub_unit: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  kode_unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nama_unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER(11),
  },
  nama_pembuat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jam_nomor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hari_nomor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bulan_nomor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tahun_nomor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bulan_nomor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_attach: {
    type: DataTypes.STRING,
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
  tableName: "nomor_surat",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

const JenisND = dbNadine.define('tbl_jenis_nd', {
  id_jenis_nd: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nama_jenis_nd: {
    type: DataTypes.STRING,
  },
  ukuran_jenis_nd: {
    type: DataTypes.STRING,
  }
}, {
  tableName: "tbl_jenis_nd",
  createdAt: false,
  updatedAt: false
});

const JenisSurat = dbNadine.define('tbl_jenis_surat', {
  id_jenis_surat: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nama_jenis_surat: {
    type: DataTypes.STRING,
  },
  jenis_surat: {
    type: DataTypes.STRING,
  },
  tbl_jenis_surat: {
    type: DataTypes.STRING,
  },
  ad_jenis_surat: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  jenis_nomor: {
    type: DataTypes.STRING,
  }
}, {
  tableName: "tbl_jenis_surat",
  createdAt: false,
  updatedAt: false
});

const KlasifikasiSurat = dbNadine.define('tbl_klasifikasi_surat', {
  id_klasifikasi_surat: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  kode_a: {
    type: DataTypes.STRING,
  },
  kode_b: {
    type: DataTypes.STRING,
  },
  kode_c: {
    type: DataTypes.STRING,
  },
  rincian: {
    type: DataTypes.STRING,
  }
}, {
  tableName: "tbl_klasifikasi_surat",
  createdAt: false,
  updatedAt: false
});

const UnitSub = dbNadine.define('tbl_unit_sub', {
  id_unit_sub: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  id_unit: {
    type: DataTypes.INTEGER(11),
  },
  nama_unit: {
    type: DataTypes.STRING,
  },
  kode_unit_kerja: {
    type: DataTypes.STRING,
  },
  kota_kab: {
    type: DataTypes.STRING,
  },
  alamat: {
    type: DataTypes.STRING,
  },
  alamat2: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  telepon: {
    type: DataTypes.STRING,
  },
  fax: {
    type: DataTypes.STRING,
  },
  laman: {
    type: DataTypes.STRING,
  },
  jabatan: {
    type: DataTypes.STRING,
  }
}, {
  tableName: "tbl_unit_sub",
  createdAt: false,
  updatedAt: false
});

module.exports = { NomorSurat, JenisND, JenisSurat, KlasifikasiSurat, UnitSub };