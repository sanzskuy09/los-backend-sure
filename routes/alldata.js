const express = require("express");
const router = express.Router();
const controller = require("../controllers/multidatacontrollers");
const creditreviewcon = require("../controllers/creditReviewController");
const controllerapproval = require("../controllers/approvalController");
const controllerReturn = require("../controllers/returnController");
const controllerCabang = require("../controllers/dataCabangController");

router.get("/alldata/:application_id/:nik", controller.getAllData);
router.get("/alamatxx/:application_id/:nik", controller.getAllData99);
router.post("/alldata", controller.insertAllData);
router.put("/alldata/:application_id/:nik", controller.updateAllData);
router.put(
  "/updatestatus/:application_id/:nik",
  controller.updateStatusPemohon,
);
router.get("/alldata2", controller.getAllData2);
router.get("/alldata3/:created_by", controller.getAllData3);
router.get("/alldata/merged", controller.getMergedAllData);
router.get("/getlist", controller.getList);
router.get("/getListPemohonPasangan", controller.getListPemohonPasangan);

// update Dealer Application
router.put("/updatedealer/:application_id", controller.updateDealerApplication);
router.post(
  "/createhitungankredit/:application_id/:nik",
  controller.createPerhitunganKredit,
);

// Credit Review routes
router.get(
  "/credit-review/:application_id/:nik",
  creditreviewcon.getCreditReview,
);
router.post("/credit-review", creditreviewcon.upsertCreditReview);

router.get("/approval/:application_id/:nik", controllerapproval.getById);
router.post("/approval", controllerapproval.save);

router.post("/approval/return", controllerReturn.returnApplication);

// cabang
router.get("/cabang", controllerCabang.getAllCabang);
router.post("/cabang", controllerCabang.createCabang);
router.put("/cabang/:id", controllerCabang.updateCabang);
router.delete("/cabang/:id", controllerCabang.deleteCabang);

router.get("/audit-trail", controller.getAuditTrail);

module.exports = router;
