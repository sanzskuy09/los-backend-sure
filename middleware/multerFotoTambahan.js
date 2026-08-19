const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📦 BODY SAAT UPLOAD:", req.body);
    const appId =
      req.body?.application_id || req.query?.application_id || "temp";
    const uploadPath = path.join(
      process.cwd(),
      "uploads",
      "foto_tambahan",
      appId
    );
    console.log("🗂️ Upload path:", uploadPath);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const safeName = `${Date.now()}_${baseName}${ext}`;
    console.log("📸 File disimpan:", safeName);
    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  const mimetype = (file.mimetype || "").toLowerCase();
  const ext = path.extname(file.originalname || "").toLowerCase();

  console.log("🚩 Incoming:", { mimetype, ext });

  // --- Image ---
  const imageExt = [".jpg", ".jpeg", ".png"];
  if (mimetype.startsWith("image/") || imageExt.includes(ext)) {
    return cb(null, true);
  }

  // --- PDF ---
  if (mimetype === "application/pdf" || ext === ".pdf") {
    return cb(null, true);
  }

  // --- BLOCK Excel ---
  // ext .xls / .xlsx → langsung tolak
  if (ext === ".xls" || ext === ".xlsx") {
    return cb(new Error("File Excel (.xls/.xlsx) tidak diperbolehkan."), false);
  }

  // --- BLOCK semua jenis files lainnya ---
  return cb(
    new Error(
      `Hanya file JPG, JPEG, PNG, atau PDF yang diperbolehkan. (file: ${file.originalname})`
    ),
    false
  );
};

// const fileFilter = (req, file, cb) => {
//   console.log("🚩 Incoming file:", {
//     fieldname: file.fieldname,
//     originalname: file.originalname,
//     mimetype: file.mimetype,
//   });

//   const allowed = [
//     "image/jpeg",
//     "image/png",
//     "image/jpg",
//     "application/pdf",
//     "application/vnd.ms-excel", // Excel .xls
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel .xlxs
//   ];
//   if (!allowed.includes(file.mimetype)) {
//     return cb(
//       new Error("Hanya file PDF, JPG, JPEG, atau PNG yang diperbolehkan."),
//       false
//     );
//   }
//   cb(null, true);
// };

// multiple files, field "file"
// module.exports = multer({ storage, fileFilter }).array("file", 10);  // ini untuk los (error)

// untuk mobile
module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
    files: 200,
  },
}).fields([
  { name: "docpekerjaanimage", maxCount: 200 },
  { name: "docsimulasiimage", maxCount: 200 },
  { name: "doctambahanimage", maxCount: 200 },
  { name: "doctambahannew", maxCount: 200 },
  { name: "docverifikasi", maxCount: 200 },
]);
