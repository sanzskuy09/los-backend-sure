const { credit_review } = require("../models");
// const { AuditTrail } = require("../models");
// const audit = require("../middleware/audit");
exports.getCreditReview = async (req, res) => {
  const { application_id, nik } = req.params;
  try {
    const data = await credit_review.findOne({ where: { application_id, nik } });
    
//      await audit.saveAudit({

//     username: "admin",

//     module: "Customer",

//     menu_name: "Master Customer",

//     action: "VIEW",

//     record_id: application_id,

//     description: "Melihat Detail Customer",

//     ip_address: req.ip,

//     browser: req.headers["user-agent"],

//     endpoint: req.originalUrl,



//     http_method: req.method,

//     response_code: 200,

//     status: "SUCCESS"

// });
        // console.log("AUDIT =", audit.toJSON());

    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });



    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.upsertCreditReview = async (req, res) => {
  const { application_id, nik } = req.body;
  if (!application_id || !nik) {
    return res.status(400).json({ message: "application_id dan nik wajib diisi" });
  }

  try {
    const [record, created] = await credit_review.upsert(req.body);
    res.status(created ? 201 : 200).json({
      message: created ? "Berhasil membuat data" : "Berhasil memperbarui data"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
