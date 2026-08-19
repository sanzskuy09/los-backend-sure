const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path as needed
const Approval = require("./approval")(sequelize, DataTypes);

// data_pemohon_sure.belongsTo(data_pemohon, {
//   foreignKey: 'application_id',
//   targetKey: 'application_id',
// });

// DataPemohonSure.hasMany(Approval, {
//   foreignKey: "application_id",
//   sourceKey: "application_id"
// });

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "data_pemohon_sure",
    {
      // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      application_id: { type: DataTypes.STRING, allowNull: false },
      nik: { type: DataTypes.STRING, allowNull: false },
      katpemohon: DataTypes.STRING,
      statuspernikahan: DataTypes.STRING,
      nama: DataTypes.STRING,
      agamapemohon: DataTypes.STRING,
      // alamat: DataTypes.STRING,
      pendidikan: DataTypes.STRING,
      jenispekerjaan: DataTypes.STRING,
      warganegarapemohon: DataTypes.STRING,
      nomortelepon: DataTypes.STRING,
      nohp: DataTypes.STRING,
      email: DataTypes.STRING,
      sim: DataTypes.STRING,
      npwp: DataTypes.STRING,
      namaibu: DataTypes.STRING,
      statusrumah: DataTypes.STRING,
      lokasirumah: DataTypes.STRING,
      katrumahpemohon: DataTypes.STRING,
      buktimilikrumahpemohon: DataTypes.STRING,
      lamatinggalpemohon: DataTypes.STRING,
      status: DataTypes.STRING,
      analisacmo: DataTypes.STRING,
      scoreliveness: DataTypes.DOUBLE,
      scoremanipulation: DataTypes.DOUBLE,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
      created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: false,
      tableName: "data_pemohon_sure",
      schema: "mobile", // ⬅️ ini baris penting
    }
  );
};
