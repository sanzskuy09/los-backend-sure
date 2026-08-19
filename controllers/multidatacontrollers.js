// const db = require('../models');
const db = require("../models");
const { Sequelize } = require("sequelize"); // class
const sequelize = db.sequelize; // instance dari models/index.js

const {
  dealer_applications,
  data_pemohon_sure,
  data_pekerjaan_pemohon,
  data_pasangan_pemohon,
  data_pekerjaan_pasangan,
  data_penjamin,
  data_pekerjaan_penjamin,
  data_pasangan_penjamin,
  data_pekerjaan_pasangan_penjamin,
  data_kontak_darurat,
  data_pemohon_o,
  data_perhitungan_kredit,
} = db;

exports.updateDealerApplication = async (req, res) => {
  try {
    const {
      application_id,
      kondisikendaraan,
      merkkendaraan,
      namadealer,
      typekendaraan,
      tahunkendaraan,
      nopolisikendaraan,
      hargakendaraan,
      uangmuka,
      pokokhutang,
    } = req.body;

    if (!application_id) {
      return res.status(400).json({
        status: "Error",
        message: "application_id wajib diisi",
      });
    }

    const result = await dealer_applications.update(
      {
        kondisikendaraan,
        merkkendaraan,
        namadealer,
        typekendaraan,
        tahunkendaraan,
        nopolisikendaraan,
        hargakendaraan,
        uangmuka,
        pokokhutang,
      },
      {
        where: { application_id },
      },
    );

    res.status(200).json({
      status: "Success",
      message: "Data dealer berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Gagal update dealer_applications: " + error.message,
    });
  }
};

exports.createPerhitunganKredit = async (req, res) => {
  try {
    // const db = require("../models");
    // const PerhitunganKredit = db.perhitungan_kredit;

    const {
      application_id,
      nik,
      harga_kendaraan,
      uang_muka,
      pokok_hutang,
      nilai_angsuran,
      pencairan_ke_dealer,
      jenis_angsur,
      metode_bunga,
      maskapai_asuransi,
      uang_muka_percent,
      tenor,
      grace_period,
      bunga_flat,
      bunga_efektif,
      tanggal_cair,
      metode_angsur,
      pembayaran,
      rate_denda,
      penalty,
    } = req.body;

    if (!application_id) {
      return res.status(400).json({
        status: "Error",
        message: "application_id wajib diisi",
      });
    }

    const [result, created] = await data_perhitungan_kredit.upsert(
      {
        application_id,
        nik,
        harga_kendaraan,
        uang_muka,
        pokok_hutang,
        nilai_angsuran,
        pencairan_ke_dealer,
        jenis_angsur,
        metode_bunga,
        maskapai_asuransi,
        uang_muka_percent,
        tenor,
        grace_period,
        bunga_flat,
        bunga_efektif,
        tanggal_cair,
        metode_angsur,
        pembayaran,
        rate_denda,
        penalty,
      },
      {
        returning: true, // PostgreSQL only
      },
    );

    res.status(created ? 201 : 200).json({
      status: "Success",
      message: created
        ? "Data perhitungan kredit berhasil dibuat"
        : "Data perhitungan kredit berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: "Error",
        message: "Data dengan application_id & nik sudah ada",
      });
    }

    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.updateStatusPemohon = async (req, res) => {
  const { status } = req.body;
  const { application_id, nik } = req.params;

  try {
    const db = require("../models");
    const DataPemohon = db.data_pemohon_sure;

    const result = await DataPemohon.update(
      { status: status },
      {
        where: { application_id, nik },
      },
    );

    res.status(200).send({
      status: "Success",
      message: "Status berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Error",
      message: "Gagal memperbarui status: " + error.message,
    });
  }
};

// const { Sequelize , sequelize} = require('sequelize'); // pastikan ini ada
// const { sequelize } = require('sequelize');

exports.getList = async (req, res) => {
  try {
    const pemohon = await data_pemohon_sure.findAll({
      attributes: [
        "application_id",
        "nama",
        "nik",
        "statuspernikahan",
        "nohp",
        "nomortelepon",
        "katpemohon",
        "status",
        "updated_date",
        [
          Sequelize.literal(`(
            SELECT a.created_date
            FROM mobile.approval a
            WHERE a.application_id = "data_pemohon_sure"."application_id"
            ORDER BY a.created_date DESC
            LIMIT 1
          )`),
          "created_date",
        ],
      ],
      
      order: [
        [
          Sequelize.literal(`CASE 
            WHEN UPPER(status) = 'CRA' THEN 1
            WHEN UPPER(status) = 'APPV-1' THEN 2
            WHEN UPPER(status) = 'APPV-2' THEN 3
            WHEN UPPER(status) = 'APPV-3' THEN 4
            WHEN UPPER(status) = 'FA' THEN 5
            ELSE 6
          END`),
          "ASC",
        ],
        [Sequelize.literal("created_date"), "DESC"],
      ],
    });

    res.status(200).json({ pemohon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getListPemohonPasangan = async (req, res) => {
  try {
    // const result = await Promise.all([
    //   data_pemohon_sure.findAll({
    //     attributes: [
    //       "application_id",
    //       "nama",
    //       "nik",
    //       "statuspernikahan",
    //       "nohp",
    //       "nomortelepon",
    //       "katpemohon",
    //       "status",
    //       "created_date",
    //       "updated_date", // tambahkan agar bisa diurutkan
    //     ],
    //     order: [
    //       [
    //         Sequelize.literal(`CASE
    //           WHEN UPPER(status) = 'CRA' THEN 1
    //           WHEN UPPER(status) = 'APPV-1' THEN 2
    //           WHEN UPPER(status) = 'APPV-2' THEN 3
    //           WHEN UPPER(status) = 'APPV-3' THEN 4
    //           WHEN UPPER(status) = 'FA' THEN 5
    //           ELSE 6
    //         END`),
    //         "ASC",
    //       ],
    //       ["created_date", "DESC"],
    //     ],
    //   }),
    //   data_pemohon_o.findOne({ where: { application_id, nik } }),
    // ]);

    // res.status(200).json({
    //   pemohon: result[0],
    // });

    const pemohonList = await data_pemohon_sure.findAll({
      attributes: [
        "application_id",
        "nama",
        "nik",
        "statuspernikahan",
        "nohp",
        "nomortelepon",
        "katpemohon",
        "status",
        "created_date",
        "updated_date",
      ],
      order: [
        [
          Sequelize.literal(`CASE
            WHEN UPPER(status) = 'CRA' THEN 1
            WHEN UPPER(status) = 'APPV-1' THEN 2
            WHEN UPPER(status) = 'APPV-2' THEN 3
            WHEN UPPER(status) = 'APPV-3' THEN 4
            WHEN UPPER(status) = 'FA' THEN 5
            ELSE 6
          END`),
          "ASC",
        ],
        ["created_date", "DESC"],
      ],
    });

    const result = await Promise.all(
      pemohonList.map(async (p) => {
        const pasangan = await data_pemohon_o.findOne({
          where: { application_id: p.application_id },
          attributes: [
            "namapasangan",
            "nikpasangan",
            "uri_pefindo",
            "uri_pefindo_pasangan",
            "uri_slik",
            "uri_slik_pasangan",
          ],
        });

        return { ...p.toJSON(), ...pasangan?.toJSON() };
      }),
    );

    res.status(200).json({
      pemohon: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getList = async (req, res) => {
//   try {
//     const result = await Promise.all([
//       data_pemohon_sure.findAll({
//         attributes: [
//           'application_id',
//           'nama',
//           'nik',
//           'statuspernikahan',
//           'nohp',
//           'nomortelepon',
//           'katpemohon',
//           'status'        ]
//       })

//     ]);

//     res.status(200).json({
//       pemohon: result[0],
//       // pekerjaan_pemohon: result[1],
//       // pasangan_pemohon: result[2]
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// GET all related data

exports.getAllData99 = async (req, res) => {
  const { application_id, nik } = req.params;
  try {
    const result = await Promise.all([
      dealer_applications.findOne({ where: { application_id, nik } }),
      data_pemohon_sure.findOne({ where: { application_id, nik } }),
      data_pekerjaan_pemohon.findOne({ where: { application_id, nik } }),
      data_pasangan_pemohon.findOne({ where: { application_id, nik } }),
      data_pekerjaan_pasangan.findOne({ where: { application_id, nik } }),
      data_penjamin.findOne({ where: { application_id, nik } }),
      data_pekerjaan_penjamin.findOne({ where: { application_id, nik } }),
      data_pasangan_penjamin.findOne({ where: { application_id, nik } }),
      data_pekerjaan_pasangan_penjamin.findOne({
        where: { application_id, nik },
      }),
      data_kontak_darurat.findOne({ where: { application_id, nik } }),
    ]);

    res.status(200).json({
      dealer: result[0],
      pemohon: result[1],
      pekerjaan_pemohon: result[2],
      pasangan_pemohon: result[3],
      pekerjaan_pasangan: result[4],
      penjamin: result[5],
      pekerjaan_penjamin: result[6],
      pasangan_penjamin: result[7],
      pekerjaan_pasangan_penjamin: result[8],
      kontak_darurat: result[9],
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
};

exports.getAllData = async (req, res) => {
  const { application_id, nik } = req.params;
  try {
    // Ambil data pemohon_sure + alamat join dari data_pemohon
    const [pemohonSure] = await sequelize.query(
      `
      SELECT 
        u.name as cmofullname, a.*,dc.cabang,
        CONCAT(
          COALESCE(b.alamat,''), ' ,RT.', COALESCE(b.rt,''),' ,RW.', COALESCE(b.rw,''),', ',
          'KEL.', COALESCE(b.kel,''), ', KEC.', COALESCE(b.kec,''), ' ,',
          'KAB/KOTA.', COALESCE(b.kota,''), ', PROV.', COALESCE(b.provinsi,'')
        ) AS alamat
      FROM mobile.data_pemohon_sure a
      LEFT JOIN mobile.data_pemohon b ON b.application_id = a.application_id
      left join mobile.users u on u.username = a.created_by 
      left join mobile.data_cabang dc on dc.kode_cabang = b.cabang 
        WHERE a.application_id = :application_id
        AND a.nik = :nik
        LIMIT 1
    `,
      {
        replacements: { application_id, nik },
        type: Sequelize.QueryTypes.SELECT, // ✅ ambil dari Sequelize, bukan instance
      },
    );

    // Ambil tabel lain pakai findOne biasa
    const result = await Promise.all([
      dealer_applications.findOne({ where: { application_id, nik } }),
      data_pekerjaan_pemohon.findOne({ where: { application_id, nik } }),
      data_pasangan_pemohon.findOne({ where: { application_id, nik } }),
      data_pekerjaan_pasangan.findOne({ where: { application_id, nik } }),
      data_penjamin.findOne({ where: { application_id, nik } }),
      data_pekerjaan_penjamin.findOne({ where: { application_id, nik } }),
      data_pasangan_penjamin.findOne({ where: { application_id, nik } }),
      data_pekerjaan_pasangan_penjamin.findOne({
        where: { application_id, nik },
      }),
      data_kontak_darurat.findOne({ where: { application_id, nik } }),
      data_perhitungan_kredit.findOne({ where: { application_id, nik } }),
    ]);

    res.status(200).json({
      dealer: result[0],
      pemohon: pemohonSure, // hasil dari raw query
      pekerjaan_pemohon: result[1],
      pasangan_pemohon: result[2],
      pekerjaan_pasangan: result[3],
      penjamin: result[4],
      pekerjaan_penjamin: result[5],
      pasangan_penjamin: result[6],
      pekerjaan_pasangan_penjamin: result[7],
      kontak_darurat: result[8],
      data_perhitungan_kredit: result[9],
    });
  } catch (error) {
    console.error("getAllData error:", error);
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
};

// POST new records
exports.insertAllData = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const {
      dealer,
      pemohon,
      pekerjaan_pemohon,
      pasangan_pemohon,
      pekerjaan_pasangan,
      penjamin,
      pekerjaan_penjamin,
      pasangan_penjamin,
      pekerjaan_pasangan_penjamin,
      kontak_darurat,
    } = req.body;

    await dealer_applications.create(dealer, { transaction: t });
    // await data_pemohon_sure.create(pemohon, { transaction: t });
    //  console.log('Tipe data_pemohon_sure:', typeof data_pemohon_sure);  // Seharusnya: function atau object
    // console.log('Apakah create tersedia?', typeof data_pemohon_sure?.create); // Seharusnya: function

    await data_pemohon_sure.create(pemohon, { transaction: t });

    await data_pekerjaan_pemohon.create(pekerjaan_pemohon, { transaction: t });
    await data_pasangan_pemohon.create(pasangan_pemohon, { transaction: t });
    await data_pekerjaan_pasangan.create(pekerjaan_pasangan, {
      transaction: t,
    });
    await data_penjamin.create(penjamin, { transaction: t });
    await data_pekerjaan_penjamin.create(pekerjaan_penjamin, {
      transaction: t,
    });
    await data_pasangan_penjamin.create(pasangan_penjamin, { transaction: t });
    await data_pekerjaan_pasangan_penjamin.create(pekerjaan_pasangan_penjamin, {
      transaction: t,
    });
    await data_kontak_darurat.create(kontak_darurat, { transaction: t });

    await t.commit();
    res.status(201).json({ message: "Semua data berhasil disimpan" });
  } catch (error) {
    await t.rollback();
    console.error("InsertAllData error:", error);
    res
      .status(500)
      .json({ message: "Gagal menyimpan data", error: error.message });
  }
};

// PUT update all
exports.updateAllData = async (req, res) => {
  const { application_id, nik } = req.params;
  const t = await db.sequelize.transaction();
  try {
    const {
      dealer,
      pemohon,
      pekerjaan_pemohon,
      pasangan_pemohon,
      pekerjaan_pasangan,
      penjamin,
      pekerjaan_penjamin,
      pasangan_penjamin,
      pekerjaan_pasangan_penjamin,
      kontak_darurat,
    } = req.body;

    await dealer_applications.update(dealer, {
      where: { application_id, nik },
      transaction: t,
    });
    await data_pemohon.update(pemohon, {
      where: { application_id, nik },
      transaction: t,
    });
    await data_pekerjaan_pemohon.update(pekerjaan_pemohon, {
      where: { application_id, nik },
      transaction: t,
    });
    await data_pasangan_pemohon.update(pasangan_pemohon, {
      where: { application_id, nik },
      transaction: t,
    });
    await data_pekerjaan_pasangan.update(pekerjaan_pasangan, {
      where: { application_id, nik },
      transaction: t,
    });
    await data_penjamin.update(penjamin, {
      where: { application_id, nik },
      transaction: t,
    });
    await data_pekerjaan_penjamin.update(pekerjaan_penjamin, {
      where: { application_id, nik },
      transaction: t,
    });
    await data_pasangan_penjamin.update(pasangan_penjamin, {
      where: { application_id, nik },
      transaction: t,
    });
    await data_pekerjaan_pasangan_penjamin.update(pekerjaan_pasangan_penjamin, {
      where: { application_id, nik },
      transaction: t,
    });
    await data_kontak_darurat.update(kontak_darurat, {
      where: { application_id, nik },
      transaction: t,
    });

    await t.commit();
    res.status(200).json({ message: "Semua data berhasil diperbarui" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: "Gagal memperbarui data", error });
  }
};

exports.getAllData2 = async (req, res) => {
  try {
    const result = await Promise.all([
      dealer_applications.findAll(),
      data_pemohon_sure.findAll(),
      data_pekerjaan_pemohon.findAll(),
      data_pasangan_pemohon.findAll(),
      data_pekerjaan_pasangan.findAll(),
      data_penjamin.findAll(),
      data_pekerjaan_penjamin.findAll(),
      data_pasangan_penjamin.findAll(),
      data_pekerjaan_pasangan_penjamin.findAll(),
      data_kontak_darurat.findAll(),
    ]);

    res.status(200).json({
      dealer: result[0],
      pemohon: result[1],
      pekerjaan_pemohon: result[2],
      pasangan_pemohon: result[3],
      pekerjaan_pasangan: result[4],
      penjamin: result[5],
      pekerjaan_penjamin: result[6],
      pasangan_penjamin: result[7],
      pekerjaan_pasangan_penjamin: result[8],
      kontak_darurat: result[9],
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil semua data", error });
  }
};

exports.getMergedAllData = async (req, res) => {
  try {
    const [
      dealer,
      pemohon,
      pekerjaan_pemohon,
      pasangan_pemohon,
      pekerjaan_pasangan,
      penjamin,
      pekerjaan_penjamin,
      pasangan_penjamin,
      pekerjaan_pasangan_penjamin,
      kontak_darurat,
    ] = await Promise.all([
      dealer_applications.findAll(),
      data_pemohon_sure.findAll(),
      data_pekerjaan_pemohon.findAll(),
      data_pasangan_pemohon.findAll(),
      data_pekerjaan_pasangan.findAll(),
      data_penjamin.findAll(),
      data_pekerjaan_penjamin.findAll(),
      data_pasangan_penjamin.findAll(),
      data_pekerjaan_pasangan_penjamin.findAll(),
      data_kontak_darurat.findAll(),
    ]);

    // Gabungkan semua data berdasarkan application_id & nik
    const merged = dealer.map((entry) => {
      const key = (item) =>
        item.application_id === entry.application_id && item.nik === entry.nik;

      return {
        application_id: entry.application_id,
        nik: entry.nik,
        dealer: entry,
        pemohon: pemohon.find(key) || null,
        pekerjaan_pemohon: pekerjaan_pemohon.find(key) || null,
        pasangan_pemohon: pasangan_pemohon.find(key) || null,
        pekerjaan_pasangan: pekerjaan_pasangan.find(key) || null,
        penjamin: penjamin.find(key) || null,
        pekerjaan_penjamin: pekerjaan_penjamin.find(key) || null,
        pasangan_penjamin: pasangan_penjamin.find(key) || null,
        pekerjaan_pasangan_penjamin:
          pekerjaan_pasangan_penjamin.find(key) || null,
        kontak_darurat: kontak_darurat.find(key) || null,
      };
    });

    res.status(200).json({ data: merged });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil dan menggabungkan data", error });
  }
};

exports.getAllData3 = async (req, res) => {
  const { created_by } = req.params;
  try {
    const result = await Promise.all([
      dealer_applications.findOne({ where: { created_by } }),
      data_pemohon_sure.findOne({ where: { created_by } }),
      data_pekerjaan_pemohon.findOne({ where: { created_by } }),
      data_pasangan_pemohon.findOne({ where: { created_by } }),
      data_pekerjaan_pasangan.findOne({ where: { created_by } }),
      data_penjamin.findOne({ where: { created_by } }),
      data_pekerjaan_penjamin.findOne({ where: { created_by } }),
      data_pasangan_penjamin.findOne({ where: { created_by } }),
      data_pekerjaan_pasangan_penjamin.findOne({ where: { created_by } }),
      data_kontak_darurat.findOne({ where: { created_by } }),
    ]);

    res.status(200).json({
      dealer: result[0],
      pemohon: result[1],
      pekerjaan_pemohon: result[2],
      pasangan_pemohon: result[3],
      pekerjaan_pasangan: result[4],
      penjamin: result[5],
      pekerjaan_penjamin: result[6],
      pasangan_penjamin: result[7],
      pekerjaan_pasangan_penjamin: result[8],
      kontak_darurat: result[9],
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
};
