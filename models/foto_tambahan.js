const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path as needed

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "foto_tambahan",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      application_id: { type: DataTypes.STRING, allowNull: false },
      nik: { type: DataTypes.STRING, allowNull: false },
      docpekerjaanimage: DataTypes.TEXT,
      docsimulasiimage: DataTypes.TEXT,
      doctambahanimage: DataTypes.TEXT,
      // doctambahannew : DataTypes.TEXT,
      doctambahannew: { type: DataTypes.TEXT, allowNull: true },
      docverifikasi: { type: DataTypes.TEXT, allowNull: true },
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
      created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: false,
      tableName: "foto_tambahan",
      schema: "mobile",
    }
  );
};
