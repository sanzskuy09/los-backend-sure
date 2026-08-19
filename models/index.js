const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import all models
db.data_perhitungan_kredit = require("./data_perhitungan_kredit")(
  sequelize,
  Sequelize.DataTypes
);
db.dealer_applications = require("./dealer_applications")(
  sequelize,
  Sequelize.DataTypes
);
db.data_pemohon_sure = require("./data_pemohon")(
  sequelize,
  Sequelize.DataTypes
);
db.data_pekerjaan_pemohon = require("./data_pekerjaan_pemohon")(
  sequelize,
  Sequelize.DataTypes
);
db.data_pasangan_pemohon = require("./data_pasangan_pemohon")(
  sequelize,
  Sequelize.DataTypes
);
db.data_pekerjaan_pasangan = require("./data_pekerjaan_pasangan")(
  sequelize,
  Sequelize.DataTypes
);
db.data_penjamin = require("./data_penjamin")(sequelize, Sequelize.DataTypes);
db.data_pekerjaan_penjamin = require("./data_pekerjaan_penjamin")(
  sequelize,
  Sequelize.DataTypes
);
db.data_pasangan_penjamin = require("./data_pasangan_penjamin")(
  sequelize,
  Sequelize.DataTypes
);
db.data_pekerjaan_pasangan_penjamin =
  require("./data_pekerjaan_pasangan_penjamin")(sequelize, Sequelize.DataTypes);
db.data_kontak_darurat = require("./data_kontak_darurat")(
  sequelize,
  Sequelize.DataTypes
);
db.data_dokumen_foto = require("./data_dokumen_foto")(
  sequelize,
  Sequelize.DataTypes
);

db.AuditTrail = require("./auditTrail")(sequelize, Sequelize.DataTypes);

db.foto_tambahan = require("./foto_tambahan")(sequelize, Sequelize.DataTypes);
(db.credit_review = require("./credit_review")(sequelize, Sequelize)),
  (db.approval = require("./approval")(sequelize, Sequelize)),
  (db.data_cabang = require("./data_cabang")(sequelize, Sequelize)),
  (db.data_pemohon_o = require("./data_pemohon_o")(sequelize, Sequelize)),
  (module.exports = db);