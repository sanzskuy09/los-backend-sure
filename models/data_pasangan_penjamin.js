const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("data_pasangan_penjamin", {
    // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    application_id: { type: DataTypes.STRING, allowNull: false },
    nik: { type: DataTypes.STRING, allowNull: false },
    namapasanganpenjamin: DataTypes.STRING,
    agamapasanganpenjamin: DataTypes.STRING,
    pekerjaanpasanganpenjamin: DataTypes.STRING,
    warganegarapasanganpenjamin: DataTypes.STRING,
    notelppasanganpenjamin: DataTypes.STRING,
    nowapasanganpenjamin: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    tableName: "data_pasangan_penjamin"
        ,schema: "mobile",      // ⬅️ ini baris penting
  });
};
