const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "data_penjamin_pemohon",
    {
      // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      application_id: { type: DataTypes.STRING, allowNull: false },
      nik: { type: DataTypes.STRING, allowNull: false },

      jnspenjamin: DataTypes.STRING,
      statuspernikahanpenjamin: DataTypes.STRING,
      namapenjamin: DataTypes.STRING,
      agamapenjamin: DataTypes.STRING,
      pekerjaanpenjamin: DataTypes.STRING,
      jabatanpenjamin: DataTypes.STRING,
      warganegarapenjamin: DataTypes.STRING,
      notelppenjamin: DataTypes.STRING,
      nowapenjamin: DataTypes.STRING,
      emailpenjamin: DataTypes.STRING,
      noktppenjamin: DataTypes.STRING,
      tglktppenjamin: DataTypes.STRING,
      npwppenjamin: DataTypes.STRING,
      alamatpenjamin: DataTypes.STRING,
      kotapenjamin: DataTypes.STRING,
      namaibupenjamin: DataTypes.STRING,
      statusrumahpenjamin: DataTypes.STRING,
      lokasirumahpenjamin: DataTypes.STRING,
      katrumahpenjamin: DataTypes.STRING,
      buktimilikrumahpenjamin: DataTypes.STRING,
      lamatinggalpenjamin: DataTypes.STRING,

      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
      created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: false,
      tableName: "data_penjamin_pemohon",
      schema: "mobile", // ⬅️ ini baris penti
    }
  );
};
