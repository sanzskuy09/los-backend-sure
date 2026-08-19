const express = require("express");
const app = express();
const db = require("./models");
const uploadRoutes = require("./routes/fotoDokumen");
const fotoTambahanRoutes = require("./routes/fotoTambahan");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route registration
app.use("/api/data", require("./routes/data"));
// app.use("/api/foto-tambahan", require("./routes/fotoTambahan"));
app.use("/api", require("./routes/alldata")); // ✅ Add this line

//image
app.use("/api/foto-dokumen", uploadRoutes);
app.use("/api/foto-tambahan", fotoTambahanRoutes);

const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
