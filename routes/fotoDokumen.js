const express = require("express");
const router = express.Router();
const controller = require("../controllers/uploadcontrollers");
const upload = require("../middleware/multerconfig");

const fields = [
  "fotounitdepan", "fotounitbelakang", "fotounitinteriordepan", "fotounitmesinplat",
  "fotomesin", "fotounitselfiecmo", "fotospeedometer", "fotogesekannoka", "fotostnk",
  "fotonoticepajak", "fotobpkb1", "fotobpkb2", "fotoktppemohon", "fotoktppasangan",
  "fotokk", "fotosima", "fotonpwp", "fotorumah", "fotorumahselfiecmo",
  "fotolingkunganselfiecmo", "fotobuktimilikrumah", "fotocloseuppemohon",
  "fotopemohonttdfpp", "fotofppdepan", "fotofppbelakang"
].map((name) => ({ name, maxCount: 1 }));

router.post("/upload/multiple", upload.fields(fields), controller.multipleUpload);
router.get("/searchby/:application_id/:nik", controller.getFotoByAppAndNik);
router.get("/searchby/:created_by", controller.getFotoByCreatedBy);

module.exports = router;
