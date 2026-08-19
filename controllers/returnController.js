const { Op } = require("sequelize");
const db = require("../models");

const { approval, credit_review, data_pemohon_sure, sequelize } = db;

exports.returnApplication = async (req, res) => {
  const { application_id, reason } = req.body;

  const t = await sequelize.transaction();

  try {
    let approvalWhere = { application_id };

    console.log("application_id ==> ", application_id);

    if (reason === "CRA") {
      // hapus semua approval
      approvalWhere = { application_id };

      // hapus juga credit_review
      await credit_review.destroy({
        where: { application_id },
        transaction: t,
      });
    } else if (reason === "APPV-1") {
      approvalWhere = { application_id };
    } else if (reason === "APPV-2") {
      approvalWhere = {
        application_id,
        approved_by: {
          [Op.notIn]: ["approver_1"],
        },
      };
    } else if (reason === "APPV-3") {
      approvalWhere = {
        application_id,
        approved_by: {
          [Op.notIn]: ["approver_1", "approver_2"],
        },
      };
    }

    // delete approval sesuai rule
    const deletedApproval = await approval.destroy({
      where: approvalWhere,
      transaction: t,
    });

    // 2️⃣ update status di data_pemohon_sure
    await data_pemohon_sure.update(
      {
        status: reason, // atau field kamu: application_status / approval_status
        updated_date: new Date(),
      },
      {
        where: { application_id },
        transaction: t,
      },
    );

    await t.commit();

    return res.json({
      message: "Return application success",
      status_updated_to: reason,
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
