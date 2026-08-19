const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("data_pekerjaan_penjamin", {
    // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    application_id: { type: DataTypes.STRING, allowNull: false },
    nik: { type: DataTypes.STRING, allowNull: false },
    namaperusahaanpenjamin: DataTypes.STRING,
    kodeposperusahaanpenjamin: DataTypes.STRING,
    alamatusahapenjamin: DataTypes.STRING,
    noteleponusahapenjamin: DataTypes.STRING,
    jabatanpenjamin: DataTypes.STRING,
    ketjabatanpenjamin: DataTypes.STRING,
    masakerjapenjamin: DataTypes.STRING,
    gajipenjamin: DataTypes.STRING,
    slipgajipenjamin: DataTypes.STRING,
    payrollpenjamin: DataTypes.STRING,
    bidangusahapenjamin: DataTypes.STRING,
    lamausahapenjamin: DataTypes.STRING,
    omzetusahapenjamin: DataTypes.STRING,
    profitusahapenjamin: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    tableName: "data_pekerjaan_penjamin"
        ,schema: "mobile"   // ⬅️ ini baris penting
  });
};
