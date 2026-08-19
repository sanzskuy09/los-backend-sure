const { foto_tambahan } = require("../models");
const BASE_URL = "http://217.196.49.162:3001";

// === UPLOAD / INSERT FOTO TAMBAHAN (SEMUA FILE MASUK KE doctambahanimage) ===
exports.uploadFotoTambahan = async (req, res) => {
  const { application_id, nik, created_by } = req.body;

  if (!application_id || !nik) {
    return res.status(400).json({ message: "application_id dan nik wajib diisi" });
  }

// Handle baik array maupun object
let filesArray = [];

if (Array.isArray(req.files)) {
  filesArray = req.files; // multer.array()
} else if (req.files && req.files.file) {
  filesArray = req.files.file; // multer.fields()
}

if (!filesArray || filesArray.length === 0) {
  return res.status(400).json({ message: "Tidak ada file yang diunggah" });
}

console.log("🧾 Files:", filesArray.map((f) => f.filename));

const fileUrls = filesArray.map(
  (file) => `http://217.196.49.162:3001/uploads/foto_tambahan/${application_id}/${file.filename}`
);


  try {
    // cek apakah record sudah ada
    const existing = await foto_tambahan.findOne({ where: { application_id, nik } });

    if (existing) {
      // gabungkan file lama + baru
      const oldFiles = JSON.parse(existing.doctambahannew || "[]");
      const updatedFiles = [...oldFiles, ...fileUrls];

      await existing.update({
        doctambahannew: JSON.stringify(updatedFiles),
        updated_by: created_by || "system",
      });

      return res.status(200).json({
        message: "File tambahan berhasil ditambahkan",
        total: updatedFiles.length,
        files: updatedFiles,
      });
    } else {
      // buat record baru
      await foto_tambahan.create({
        application_id,
        nik,
        created_by,
        doctambahannew: JSON.stringify(fileUrls),
      });

      return res.status(201).json({
        message: "Data foto tambahan berhasil disimpan",
        total: fileUrls.length,
        files: fileUrls,
      });
    }
  } catch (error) {
    console.error("❌ Upload Foto Tambahan Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// === GET FOTO TAMBAHAN BERDASARKAN application_id & nik ===
exports.getFotoTambahan = async (req, res) => {
  const { application_id, nik } = req.params;

  try {
    const data = await foto_tambahan.findOne({ where: { application_id, nik } });

    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    const parsed = {
      ...data.toJSON(),
      doctambahanimage: JSON.parse(data.doctambahanimage || "[]"),
      doctambahannew: JSON.parse(data.doctambahannew || "[]"), // ← tambahkan ini
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
