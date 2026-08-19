// models/credit_review.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("credit_review", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    application_id: { type: DataTypes.STRING, allowNull: false },
    nik: { type: DataTypes.STRING, allowNull: false },

    // Summary
    summary_slik_pefindo: DataTypes.TEXT,

    // Phone Verification
    phone_verif_result: DataTypes.STRING,
    phone_verif_date: DataTypes.DATE,
    phone_verif_by: DataTypes.STRING,
    phone_verif_notes: DataTypes.TEXT,

    // Detail Verification
    phone_number: DataTypes.STRING,
    detail_verif_notes: DataTypes.TEXT,

    // Info Pinjaman
    tenor_tahun: DataTypes.STRING,
    kunjungan_cmo: DataTypes.STRING,
    pinjaman_notes: DataTypes.TEXT,

    // Kapasitas & Kondisi
    penghasilan_perbulan: DataTypes.STRING,
    lamatinggal: DataTypes.STRING,
    status_rumah: DataTypes.STRING,
    kapasitas_notes: DataTypes.TEXT,

    // Info Diri Debitur
    nama_debitur_sesuai: DataTypes.STRING,
    punya_kendaraan_lain: DataTypes.STRING,
    emergency_contact_keluarga: DataTypes.STRING,
    nama_pasangan_sesuai: DataTypes.STRING,
    domisili_emergency_contact: DataTypes.STRING,
    alamat_tinggal: DataTypes.STRING,
    punya_ktp: DataTypes.STRING,
    punya_npwp: DataTypes.STRING,
    punya_sim: DataTypes.STRING,
    contacted_number: DataTypes.STRING,
    tujuan_penggunaan_unit: DataTypes.STRING,
    diri_notes: DataTypes.TEXT,

    // Info Unit
    spesifikasi_unit: DataTypes.STRING,
    warna_unit: DataTypes.STRING,
    penggunaan_untuk: DataTypes.STRING,
    unit_notes: DataTypes.TEXT,

    // Info Pembayaran
    pembayaran_pertama: DataTypes.STRING,
    pembayaran_notes: DataTypes.TEXT,

    // Info Pekerjaan
    pekerjaan_debitur: DataTypes.STRING,
    jabatan_debitur: DataTypes.STRING,
    pekerjaan_notes: DataTypes.TEXT,

    // EDD - Rekening
    edd_bank: DataTypes.STRING,
    edd_norek: DataTypes.STRING,
    edd_nama_rek: DataTypes.STRING,

    // EDD - PEP
    edd_pep_nama: DataTypes.STRING,
    edd_pep_jabatan: DataTypes.STRING,
    edd_pep_instansi: DataTypes.STRING,
    edd_pep_hubungan: DataTypes.STRING,

    recommended: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    tableName: "credit_review",
    schema: "mobile"
  });
};
