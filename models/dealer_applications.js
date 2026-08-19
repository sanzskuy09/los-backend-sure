const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "dealer_applications",
    {
      // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      application_id: { type: DataTypes.STRING, allowNull: false },
      nik: { type: DataTypes.STRING, allowNull: false },
      kddealer: DataTypes.STRING,
      namadealer: DataTypes.STRING,
      alamatdealer: DataTypes.STRING,
      rtdealer: DataTypes.STRING,
      rwdealer: DataTypes.STRING,
      kelurandealer: DataTypes.STRING,
      kecamatandealer: DataTypes.STRING,
      kotadealer: DataTypes.STRING,
      provinsi: DataTypes.STRING,
      kodeposdealer: DataTypes.STRING,
      telpondealer: DataTypes.STRING,
      namapemilikdealer: DataTypes.STRING,
      nohppemilik: DataTypes.STRING,
      picdealer: DataTypes.STRING,
      kondisikendaraan: DataTypes.STRING,
      merkkendaraan: DataTypes.STRING,
      typekendaraan: DataTypes.STRING,
      tahunkendaraan: DataTypes.STRING,
      nopolisikendaraan: DataTypes.STRING,
      hargakendaraan: DataTypes.STRING,
      uangmuka: DataTypes.STRING,
      pokokhutang: DataTypes.STRING,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,

      alamatsurvey: DataTypes.STRING,
      rtsurvey: DataTypes.STRING,
      rwsurvey: DataTypes.STRING,
      kodepossurvey: DataTypes.STRING,
      kelsurvey: DataTypes.STRING,
      kecsurvey: DataTypes.STRING,
      kotasurvey: DataTypes.STRING,
      provinsisurvey: DataTypes.STRING,

      created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: false,
      tableName: "dealer_applications",
      schema: "mobile", // ⬅️ ini baris penting
    }
  );
};
