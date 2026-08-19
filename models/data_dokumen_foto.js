const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed


module.exports = (sequelize, DataTypes) => {
  return sequelize.define("data_dokumen_foto", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    application_id: { type: DataTypes.STRING, allowNull: false },
    nik: { type: DataTypes.STRING, allowNull: false },
    odometer: DataTypes.TEXT,
    fotounitdepan: DataTypes.TEXT,
    fotounitbelakang: DataTypes.TEXT,
    fotounitinteriordepan: DataTypes.TEXT,
    fotounitmesinplat: DataTypes.TEXT,
    fotomesin: DataTypes.TEXT,
    fotounitselfiecmo: DataTypes.TEXT,
    fotospeedometer: DataTypes.TEXT,
    fotogesekannoka: DataTypes.TEXT,
    fotostnk: DataTypes.TEXT,
    fotonoticepajak: DataTypes.TEXT,
    fotobpkb1: DataTypes.TEXT,
    fotobpkb2: DataTypes.TEXT,
    fotoktppemohon: DataTypes.TEXT,
    fotoktppasangan: DataTypes.TEXT,
    fotokk: DataTypes.TEXT,
    fotosima: DataTypes.TEXT,
    fotonpwp: DataTypes.TEXT,
    fotorumah: DataTypes.TEXT,
    fotorumahselfiecmo: DataTypes.TEXT,
    fotolingkunganselfiecmo: DataTypes.TEXT,
    fotobuktimilikrumah: DataTypes.TEXT,
    fotocloseuppemohon: DataTypes.TEXT,
    fotopemohonttdfpp: DataTypes.TEXT,
    fotofppdepan: DataTypes.TEXT,
    fotofppbelakang: DataTypes.TEXT,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    tableName : "data_foto_dokumen",
    schema : "mobile"
  });
};