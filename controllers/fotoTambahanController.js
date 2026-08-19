const { foto_tambahan } = require("../models");
const BASE_URL = "http://217.196.49.162:3001";

// === UPLOAD / INSERT FOTO TAMBAHAN (SEMUA FILE MASUK KE doctambahanimage) ===
// exports.uploadFotoTambahan = async (req, res) => {
//   const { application_id, nik, created_by } = req.body;

//   if (!application_id || !nik) {
//     return res.status(400).json({ message: "application_id dan nik wajib diisi" });
//   }

// // Handle baik array maupun object
// let filesArray = [];

// if (Array.isArray(req.files)) {
//   filesArray = req.files; // multer.array()
// } else if (req.files && req.files.file) {
//   filesArray = req.files.file; // multer.fields()
// }

// if (!filesArray || filesArray.length === 0) {
//   return res.status(400).json({ message: "Tidak ada file yang diunggah" });
// }

// console.log("🧾 Files:", filesArray.map((f) => f.filename));

// const fileUrls = filesArray.map(
//   (file) => `http://217.196.49.162:3001/uploads/foto_tambahan/${application_id}/${file.filename}`
// );

//   try {
//     // cek apakah record sudah ada
//     const existing = await foto_tambahan.findOne({ where: { application_id, nik } });

//     if (existing) {
//       // gabungkan file lama + baru
//       const oldFiles = JSON.parse(existing.doctambahannew || "[]");
//       const updatedFiles = [...oldFiles, ...fileUrls];

//       await existing.update({
//         doctambahannew: JSON.stringify(updatedFiles),
//         updated_by: created_by || "system",
//       });

//       return res.status(200).json({
//         message: "File tambahan berhasil ditambahkan",
//         total: updatedFiles.length,
//         files: updatedFiles,
//       });
//     } else {
//       // buat record baru
//       await foto_tambahan.create({
//         application_id,
//         nik,
//         created_by,
//         doctambahannew: JSON.stringify(fileUrls),
//       });

//       return res.status(201).json({
//         message: "Data foto tambahan berhasil disimpan",
//         total: fileUrls.length,
//         files: fileUrls,
//       });
//     }
//   } catch (error) {
//     console.error("❌ Upload Foto Tambahan Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.uploadFotoTambahan = async (req, res) => {
  const { application_id, nik, created_by } = req.body;

  if (!application_id || !nik) {
    return res
      .status(400)
      .json({ message: "application_id dan nik wajib diisi" });
  }

  // Ambil file per field (req.files dibuat oleh upload.fields([...]))
  const pekerjaanFiles = req.files?.docpekerjaanimage || [];
  const simulasiFiles = req.files?.docsimulasiimage || [];
  const tambahanFiles = req.files?.doctambahanimage || [];

  // Kalau tidak ada file sama sekali
  if (
    pekerjaanFiles.length === 0 &&
    simulasiFiles.length === 0 &&
    tambahanFiles.length === 0
  ) {
    return res.status(400).json({ message: "Tidak ada file yang diunggah" });
  }

  // Helper: bikin URL dari file object
  const makeUrl = (file) =>
    `http://217.196.49.162:3001/uploads/foto_tambahan/${application_id}/${file.filename}`;

  // Buat arrays url per field
  const pekerjaanUrls = pekerjaanFiles.map(makeUrl);
  const simulasiUrls = simulasiFiles.map(makeUrl);
  const tambahanUrls = tambahanFiles.map(makeUrl);

  console.log("🧾 docpekerjaanimage:", pekerjaanUrls);
  console.log("🧾 docsimulasiimage:", simulasiUrls);
  console.log("🧾 doctambahanimage:", tambahanUrls);

  try {
    // cari existing
    const existing = await foto_tambahan.findOne({
      where: { application_id, nik },
    });

    if (existing) {
      // parse existing columns (toleransi jika null/empty)
      const oldPekerjaan = JSON.parse(existing.docpekerjaanimage || "[]");
      const oldSimulasi = JSON.parse(existing.docsimulasiimage || "[]");
      const oldTambahan = JSON.parse(existing.doctambahanimage || "[]");
      // OPTIONAL: jika kamu masih pakai doctambahannew sebagai kolom agregat
      // const oldTambahanNew = JSON.parse(existing.doctambahannew || "[]");

      // merge per-field (hindari duplikat jika perlu)
      const mergedPekerjaan = [...oldPekerjaan, ...pekerjaanUrls];
      const mergedSimulasi = [...oldSimulasi, ...simulasiUrls];
      const mergedTambahan = [...oldTambahan, ...tambahanUrls];

      // update optional doctambahannew sebagai agregat semua images (jika ingin)
      const mergedAll = [
        // ...oldTambahanNew,
        ...pekerjaanUrls,
        ...simulasiUrls,
        ...tambahanUrls,
      ];

      await existing.update({
        docpekerjaanimage: JSON.stringify(mergedPekerjaan),
        docsimulasiimage: JSON.stringify(mergedSimulasi),
        doctambahanimage: JSON.stringify(mergedTambahan),
        // doctambahannew:    JSON.stringify(mergedAll), // optional: hapus kalau tidak diperlukan
        updated_by: created_by || "system",
        updated_date: new Date(),
      });

      return res.status(200).json({
        message: "File tambahan berhasil ditambahkan",
        files: {
          docpekerjaanimage: mergedPekerjaan,
          docsimulasiimage: mergedSimulasi,
          doctambahanimage: mergedTambahan,
          // doctambahannew: mergedAll, // optional
        },
      });
    } else {
      // create baru: simpan sesuai kolom masing-masing
      const payload = {
        application_id,
        nik,
        created_by,
        // simpan sebagai JSON string sesuai definisi model yang pakai TEXT
        docpekerjaanimage: JSON.stringify(pekerjaanUrls),
        docsimulasiimage: JSON.stringify(simulasiUrls),
        doctambahanimage: JSON.stringify(tambahanUrls),
        // optional: agregat
        // doctambahannew:    JSON.stringify([...pekerjaanUrls, ...simulasiUrls, ...tambahanUrls]),
      };

      await foto_tambahan.create(payload);

      return res.status(201).json({
        message: "Data foto tambahan berhasil disimpan",
        files: {
          docpekerjaanimage: pekerjaanUrls,
          docsimulasiimage: simulasiUrls,
          doctambahanimage: tambahanUrls,
        },
      });
    }
  } catch (error) {
    console.error("❌ Upload Foto Tambahan Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.uploadFotoTambahanLOS = async (req, res) => {
  const { application_id, nik, created_by } = req.body;

  if (!application_id || !nik) {
    return res
      .status(400)
      .json({ message: "application_id dan nik wajib diisi" });
  }

  // 1. Ambil file dari key "doctambahannew" (sesuai perubahan frontend)
  // Perhatikan: jika pakai upload.fields, aksesnya req.files['doctambahannew']
  const uploadedFiles = req.files?.doctambahannew || [];

  if (uploadedFiles.length === 0) {
    return res
      .status(400)
      .json({ message: "Tidak ada file doctambahannew yang diunggah" });
  }

  // Helper: buat URL
  const makeUrl = (file) =>
    `http://217.196.49.162:3001/uploads/foto_tambahan/${application_id}/${file.filename}`;

  // 2. Convert file object jadi array URL
  const newUrls = uploadedFiles.map(makeUrl);

  try {
    // 3. Cari data existing
    const existing = await foto_tambahan.findOne({
      where: { application_id, nik },
    });

    if (existing) {
      // --- KONDISI UPDATE ---

      // Ambil data lama dari kolom doctambahannew
      const currentDocs = JSON.parse(existing.doctambahannew || "[]");

      // Gabungkan data lama + data baru
      const mergedDocs = [...currentDocs, ...newUrls];

      await existing.update({
        doctambahannew: JSON.stringify(mergedDocs), // Simpan ke doctambahannew
        updated_by: created_by || "system",
        updated_date: new Date(),
      });

      return res.status(200).json({
        message: "File berhasil ditambahkan ke doctambahannew",
        data: mergedDocs,
      });
    } else {
      // --- KONDISI CREATE BARU ---

      const payload = {
        application_id,
        nik,
        created_by,
        // Kolom lain biarkan array kosong dulu []
        docpekerjaanimage: "[]",
        docsimulasiimage: "[]",
        doctambahanimage: "[]",
        // Masukkan file baru ke kolom doctambahannew
        doctambahannew: JSON.stringify(newUrls),
      };

      await foto_tambahan.create(payload);

      return res.status(201).json({
        message: "Data baru dibuat, file disimpan di doctambahannew",
        data: newUrls,
      });
    }
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.uploadFotoVerifiaksiPraGolife = async (req, res) => {
  const { application_id, nik, created_by } = req.body;

  if (!application_id || !nik) {
    return res
      .status(400)
      .json({ message: "application_id dan nik wajib diisi" });
  }

  // 1. Ambil file dari key "docverifikasi" (sesuai perubahan frontend)
  // Perhatikan: jika pakai upload.fields, aksesnya req.files['docverifikasi']
  const uploadedFiles = req.files?.docverifikasi || [];

  if (uploadedFiles.length === 0) {
    return res
      .status(400)
      .json({ message: "Tidak ada file docverifikasi yang diunggah" });
  }

  // Helper: buat URL
  const makeUrl = (file) =>
    `http://217.196.49.162:3001/uploads/foto_tambahan/${application_id}/${file.filename}`;

  // 2. Convert file object jadi array URL
  const newUrls = uploadedFiles.map(makeUrl);

  try {
    // 3. Cari data existing
    const existing = await foto_tambahan.findOne({
      where: { application_id, nik },
    });

    if (existing) {
      // --- KONDISI UPDATE ---

      // Ambil data lama dari kolom docverifikasi
      const currentDocs = JSON.parse(existing.docverifikasi || "[]");

      // Gabungkan data lama + data baru
      const mergedDocs = [...currentDocs, ...newUrls];

      await existing.update({
        docverifikasi: JSON.stringify(mergedDocs), // Simpan ke docverifikasi
        updated_by: created_by || "system",
        updated_date: new Date(),
      });

      return res.status(200).json({
        message: "File berhasil ditambahkan ke docverifikasi",
        data: mergedDocs,
      });
    } else {
      // --- KONDISI CREATE BARU ---

      const payload = {
        application_id,
        nik,
        created_by,
        // Kolom lain biarkan array kosong dulu []
        docpekerjaanimage: "[]",
        docsimulasiimage: "[]",
        doctambahanimage: "[]",
        doctambahannew: "[]",
        docverifikasi: JSON.stringify(newUrls),
      };

      await foto_tambahan.create(payload);

      return res.status(201).json({
        message: "Data baru dibuat, file disimpan di docverifikasi",
        data: newUrls,
      });
    }
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// === GET FOTO TAMBAHAN BERDASARKAN application_id & nik ===
exports.getFotoTambahan = async (req, res) => {
  const { application_id, nik } = req.params;

  try {
    const data = await foto_tambahan.findOne({
      where: { application_id, nik },
    });

    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    const parsed = {
      ...data.toJSON(),
      doctambahanimage: JSON.parse(data.doctambahanimage || "[]"),
      doctambahannew: JSON.parse(data.doctambahannew || "[]"), // ← tambahkan ini
      docverifikasi: JSON.parse(data.docverifikasi || "[]"), // ← tambahkan ini
    };

    res.status(200).json(parsed);
  } catch (error) {
    console.error("Get Foto Tambahan Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// === GET FOTO TAMBAHAN BERDASARKAN created_by ===
exports.getFotoTambahanByCreatedBy = async (req, res) => {
  const { created_by } = req.params;

  try {
    const data = await foto_tambahan.findAll({ where: { created_by } });
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const parsedData = data.map((item) => {
      const parsed = item.toJSON();
      parsed.doctambahannew = JSON.parse(parsed.doctambahanimage || "[]");
      return parsed;
    });

    res.status(200).json(parsedData);
  } catch (error) {
    console.error("Get Foto Tambahan by created_by Error:", error);
    res.status(500).json({ error: error.message });
  }
};
