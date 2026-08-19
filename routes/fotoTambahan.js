const express = require("express");
const router = express.Router();
const controller = require("../controllers/fotoTambahanController");
const upload = require("../middleware/multerFotoTambahan");

// Endpoint upload
router.post("/upload", upload, controller.uploadFotoTambahan);
router.post("/upload-los", upload, controller.uploadFotoTambahanLOS);
router.post(
  "/upload-verifikasi-pragolife",
  upload,
  controller.uploadFotoVerifiaksiPraGolife
);

// Endpoint ambil data berdasarkan application_id dan nik
router.get("/searchby/:application_id/:nik", controller.getFotoTambahan);

// Endpoint ambil data berdasarkan created_by
router.get("/bycreator/:created_by", controller.getFotoTambahanByCreatedBy);

module.exports = router;
