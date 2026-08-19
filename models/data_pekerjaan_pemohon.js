const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "data_pekerjaan_pemohon",
    {
      // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      application_id: { type: DataTypes.STRING, allowNull: false },
      nik: { type: DataTypes.STRING, allowNull: false },
      namaperusahaan: DataTypes.STRING,
      kodeposperusahaan: DataTypes.STRING,
      alamatusaha: DataTypes.TEXT,
      jabatan: DataTypes.STRING,
      ketjabatan: DataTypes.TEXT,
      noteleponusaha: DataTypes.STRING,
      masakerjapemohon: DataTypes.STRING,
      gajipemohon: DataTypes.STRING,
      slipgajipemohon: DataTypes.STRING,
      payrollpemohon: DataTypes.STRING,
      usaha_namaperusahaan: DataTypes.STRING,
      bidangusahapemohon: DataTypes.STRING,
      lamausahapemohon: DataTypes.STRING,
      omzetusahapemohon: DataTypes.STRING,
      profitusahapemohon: DataTypes.STRING,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
      created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: false,
      tableName: "data_pekerjaan_pemohon",
      schema: "mobile", // ⬅️ ini baris penting
    }
  );
};
