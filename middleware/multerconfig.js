const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const application_id =
      req.headers["application_id"] || req.body.application_id || req.query.application_id;

    if (!application_id) {
      return cb(new Error("application_id is required"), null);
    }

    const dir = path.join(__dirname, "..", "uploads", application_id);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

module.exports = multer({ storage });
