const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "data_perhitungan_kredit",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      application_id: { type: DataTypes.STRING, allowNull: false },
      nik: { type: DataTypes.STRING, allowNull: false },
      harga_kendaraan: DataTypes.BIGINT,
      uang_muka: DataTypes.BIGINT,
      pokok_hutang: DataTypes.BIGINT,
      nilai_angsuran: DataTypes.BIGINT,
      pencairan_ke_dealer: DataTypes.BIGINT,

      jenis_angsur: DataTypes.STRING,
      metode_bunga: DataTypes.STRING,
      maskapai_asuransi: DataTypes.STRING,

      uang_muka_percent: DataTypes.INTEGER,
      tenor: DataTypes.INTEGER,
      grace_period: DataTypes.INTEGER,

      bunga_flat: DataTypes.DECIMAL(5, 2),
      bunga_efektif: DataTypes.DECIMAL(5, 2),

      tanggal_cair: DataTypes.DATEONLY,

      metode_angsur: DataTypes.STRING,
      pembayaran: DataTypes.STRING,

      rate_denda: DataTypes.DECIMAL(5, 2),
      penalty: DataTypes.DECIMAL(5, 2),

      created_by: DataTypes.STRING,

      created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: false,
      tableName: "data_perhitungan_kredit",
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["application_id", "nik"],
        },
      ],
      schema: "mobile", // ⬅️ ini baris penting
    },
  );
};
