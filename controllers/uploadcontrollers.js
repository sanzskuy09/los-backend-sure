const path = require("path");
const { data_dokumen_foto } = require("../models");

//upload multiple 26field
exports.multipleUpload = async (req, res) => {
  const { application_id, nik } = req.body;

  if (!application_id || !nik) {
    return res.status(400).json({ error: "application_id dan nik wajib diisi" });
  }

  const expectedFields = [
    "fotounitdepan", "fotounitbelakang", "fotounitinteriordepan", "fotounitmesinplat",
    "fotomesin", "fotounitselfiecmo", "fotospeedometer", "fotogesekannoka", "fotostnk",
    "fotonoticepajak", "fotobpkb1", "fotobpkb2", "fotoktppemohon", "fotoktppasangan",
    "fotokk", "fotosima", "fotonpwp", "fotorumah", "fotorumahselfiecmo",
    "fotolingkunganselfiecmo", "fotobuktimilikrumah", "fotocloseuppemohon",
    "fotopemohonttdfpp", "fotofppdepan", "fotofppbelakang"
  ];

  const updateData = {
  created_by: req.body.created_by || null,
    odometer: req.body.odometer || null,

};

for (let field of expectedFields) {
  if (req.files && req.files[field]) {
    updateData[field] = `http://217.196.49.162:3001/uploads/${application_id}/${req.files[field][0].filename}`;
  } else {
    updateData[field] = null;
  }
}

  try {
    const existing = await data_dokumen_foto.findOne({ where: { application_id, nik } });

    if (existing) {
      const updatedFields = {};
      for (let key in req.files) {
        updatedFields[key] = `http://217.196.49.162:3001/uploads/${application_id}/${req.files[key][0].filename}`;
      }
      await existing.update(updatedFields);
      return res.json({ message: "Berhasil update sebagian data", updatedFields });
    } else {
      await data_dokumen_foto.create({ application_id, nik, ...updateData });
      return res.status(201).json({ message: "Berhasil buat data baru", updateData });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: error.message });
  }
};

//get by application_id dan  nik
exports.getFotoByAppAndNik = async (req, res) => {
  const { application_id, nik } = req.params;

  if (!application_id || !nik) {
    return res.status(400).json({ message: "application_id dan nik wajib diisi" });
  }

  try {
    const data = await data_dokumen_foto.findOne({
      where: { application_id, nik },
    });

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("GET foto error:", error);
    res.status(500).json({ message: "Gagal mengambil data foto", error: error.message });
  }
};

//get by user login
exports.getFotoByCreatedBy = async (req, res) => {
  const { created_by } = req.params;

  if (!created_by) {
    return res.status(400).json({ message: "created_by wajib diisi" });
  }

  try {
    const data = await data_dokumen_foto.findAll({
      where: { created_by },
    });

    if (data.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan untuk created_by tersebut" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("GET by created_by error:", error);
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};
