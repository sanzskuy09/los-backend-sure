const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("data_pekerjaan_pasangan", {
    // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    application_id: { type: DataTypes.STRING, allowNull: false },
    nik: { type: DataTypes.STRING, allowNull: false },
    namaperusahaanpasangan: DataTypes.STRING,
    kodeposperusahaanpasangan: DataTypes.STRING,
    alamatusahapasangan: DataTypes.STRING,
    noteleponusahapasangan: DataTypes.STRING,
    jabatanpasangan: DataTypes.STRING,
    ketjabatanpasangan: DataTypes.STRING,
    masakerjapasangan: DataTypes.STRING,
    gajipasangan: DataTypes.STRING,
    slipgajipasangan: DataTypes.STRING,
    payrollpasangan: DataTypes.STRING,
    bidangusahapasangan: DataTypes.STRING,
    lamausahapasangan: DataTypes.STRING,
    omzetusahapasangan: DataTypes.STRING,
    profitusahapasangan: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    tableName: "data_pekerjaan_pasangan"
        ,schema: "mobile",      // ⬅️ ini baris penting
  });
};
