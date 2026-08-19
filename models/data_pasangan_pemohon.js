module.exports = (sequelize, DataTypes) => {
  return sequelize.define("data_pasangan_pemohon", {
    // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    application_id: { type: DataTypes.STRING, allowNull: false },
    nik: { type: DataTypes.STRING, allowNull: false },
    namapasangan: DataTypes.STRING,
    namapanggilan: DataTypes.STRING,
    ktppasangan: DataTypes.STRING,
    agamapasangan: DataTypes.STRING,
    pekerjaanpasangan: DataTypes.STRING,
    warganegarapasangan: DataTypes.STRING,
    notelppasangan: DataTypes.STRING,
    nohppasangan: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "data_pasangan_pemohon",
    timestamps: false
        ,schema: "mobile",      // ⬅️ ini baris penting
  });
};
