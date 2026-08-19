const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("data_pekerjaan_pasangan_penjamin", {
    // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    application_id: { type: DataTypes.STRING, allowNull: false },
    nik: { type: DataTypes.STRING, allowNull: false },
    namaperusahaanpasanganpenjamin: DataTypes.STRING,
    kodeposperusahaanpasanganpenjamin: DataTypes.STRING,
    alamatusahapasanganpenjamin: DataTypes.STRING,
    noteleponusahapasanganpenjamin: DataTypes.STRING,
    jabatanpasanganpenjamin: DataTypes.STRING,
    ketjabatanpasanganpenjamin: DataTypes.STRING,
    masakerjapasanganpenjamin: DataTypes.STRING,
    gajipasanganpenjamin: DataTypes.STRING,
    slipgajipasanganpenjamin: DataTypes.STRING,
    payrollpasanganpenjamin: DataTypes.STRING,
    bidangusahapasanganpenjamin: DataTypes.STRING,
    lamausahapasanganpenjamin: DataTypes.STRING,
    omzetusahapasanganpenjamin: DataTypes.STRING,
    profitusahapasanganpenjamin: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    tableName: "data_pekerjaan_pasangan_penjamin"
        ,schema: "mobile",      // ⬅️ ini baris penting
  });
};
