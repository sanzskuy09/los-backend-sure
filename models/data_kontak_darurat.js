const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("data_kontak_darurat", {
    // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    application_id: { type: DataTypes.STRING, allowNull: false },
    nik: { type: DataTypes.STRING, allowNull: false },
    namakontak: DataTypes.STRING,
    jeniskelaminkontak: DataTypes.STRING,
    hubungankeluarga: DataTypes.STRING,
    nohpkontak: DataTypes.STRING,
    kodeposkontak: DataTypes.STRING,
    alamatkontak: DataTypes.STRING,
    namalingkungan: DataTypes.STRING,
    hublingkungan: DataTypes.STRING,
    infolingkungan: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    tableName: "data_kontak_darurat"
    ,schema: "mobile",      // ⬅️ ini baris penting

  });
};
