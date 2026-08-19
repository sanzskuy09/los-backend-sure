// controllers/approvalController.js
const { approval } = require("../models");
// const Approval = db.approval;




exports.getById = async (req, res) => {
  const { application_id, nik } = req.params;

  try {

    const data = await approval.findAll({ where: { application_id, nik } });
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.json(data);

    // return res.status(404).json({ message: "Data not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




exports.save = async (req, res) => {
  const {
    application_id,
    nik,
    approval_note,
    approved_by,
    is_final_approve,
    is_final_reject,
    created_by,
    updated_by
  } = req.body;

  try {
    const data = await approval.create({
      application_id,
      nik,
      approval_note,
      approved_by,
      is_final_approve,
      is_final_reject,
      created_by,
      created_date: new Date(),
      updated_by,
      updated_date: new Date(),
    });

    res.json({ message: 'Created', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

