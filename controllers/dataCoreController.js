// function mapValue(mapObj, value) {
//   if (typeof value !== "string") return value;
//   return mapObj[value.toLowerCase()] || value;
// }

// exports.getDataCore = async (req, res) => {
//   try {
//     const { id } = req.query;
//     const whereClause = id ? { id } : {};

//     const data = await models.data_core.findAll({ where: whereClause });

//     res.send(defaultMessage(200, "Success", data));
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(defaultMessage(500, "Error", error));
//   }
// };

// exports.addDataCore = async (req, res) => {
//   try {
//     const schema = joi.object({
//       // Data Pribadi Debitur
//       kdcab: joi.string().required(),
//       nama: joi.string().required(),
//       namaktp: joi.string().required(),
//       tempatlahir: joi.string().required(),
//       tanggallahir: joi.date().iso().required(), // Format YYYY-MM-DD
//       umur: joi.number().integer().required(),
//       lokasiusaha: joi.string().required(),
//       kota: joi.string().required(),
//       alamat: joi.string().required(),
//       kodepos: joi.string().required(),
//       kelurahan: joi.string().required(),
//       kecamatan: joi.string().required(),
//       pendidikan: joi.string().required(),
//       ktp: joi.string().required(),
//       sim: joi.string().required(),
//       npwp: joi.string().required(),
//       statuspernikahan: joi.string().required(),
//       jeniskelamin: joi.string().required(),
//       nomortelepon: joi.string().required(),
//       nohp: joi.string().required(),
//       email: joi.string().email().required(),
//       namaibu: joi.string().required(),
//       statusrumah: joi.string().required(),

//       // Kategori & Golongan Debitur
//       katdeb: joi.string().required(),
//       katdebnm: joi.string().required(),
//       goldeb: joi.string().required(),
//       goldebnm: joi.string().required(),

//       // Info Marketing Officer & User
//       kodemo: joi.string().required(),
//       namamo: joi.string().required(),
//       usrid: joi.string().required(),

//       // Info Pekerjaan
//       jenispekerjaan: joi.string().required(),
//       kodepekerjaan: joi.string().required(),
//       namaperusahaan: joi.string().required(),
//       kodeposperusahaan: joi.string().required(),
//       alamatusaha: joi.string().required(),

//       // Kontak Darurat
//       namakontak: joi.string().required(),
//       jeniskelaminkontak: joi.string().required(),
//       hubungankeluarga: joi.string().required(),
//       alamatkontak: joi.string().required(),
//       kodeposkontak: joi.string().required(),
//       nohpkontak: joi.string().required(),

//       // Data Pasangan
//       namapasangan: joi.string().required(),
//       namapanggilan: joi.string().required(),
//       ktppasangan: joi.string().required(),
//       tempatlahirpasangan: joi.string().required(),
//       tanggallahirpasangan: joi.date().iso().required(), // Format YYYY-MM-DD
//       nohppasangan: joi.string().required(),

//       // Detail Permohonan Kredit
//       plafond: joi.number().required(),
//       kodeproduk: joi.string().required(),
//       kolekbi: joi.string().required(),
//       tujuanpenggunaan: joi.string().required(),
//       tglpermohonan: joi.date().iso().required(), // Format YYYY-MM-DD
//       jangkawaktu: joi.number().integer().required(),
//       tanggalawal: joi.date().iso().required(), // Format YYYY-MM-DD
//       rumusbunga: joi.string().required(),
//       metodeangsur: joi.string().required(),
//       baserate: joi.number().required(),
//       flat: joi.number().required(),
//     });

//     const { error } = schema.validate(req.body);

//     if (error) {
//       return res
//         .status(400)
//         .send(defaultMessage(400, error.details[0].message, null));
//     }

//     // 🔁 Mapping deskripsi status ke angka
//     const statusPernikahanMap = {
//       menikah: "1",
//       "belum menikah": "2",
//       "janda/duda": "3",
//     };

//     const jenisKelaminMap = {
//       "laki-laki": "L",
//       perempuan: "P",
//     };

//     const hubunganKeluargaMap = {
//       "orang tua": "1",
//       "saudara kandung": "2",
//       anak: "3",
//       "saudara kandung orangtua": "4",
//       lainnya: "5",
//     };

//     // Ganti jika input berupa string deskriptif
//     req.body.statuspernikahan = mapValue(
//       statusPernikahanMap,
//       req.body.statuspernikahan
//     );
//     req.body.jeniskelamin = mapValue(jenisKelaminMap, req.body.jeniskelamin);
//     req.body.jeniskelaminkontak = mapValue(
//       jenisKelaminMap,
//       req.body.jeniskelaminkontak
//     );
//     req.body.hubungankeluarga = mapValue(
//       hubunganKeluargaMap,
//       req.body.hubungankeluarga
//     );

//     const data = await models.data_core.create(req.body);

//     res.status(201).send(defaultMessage(201, "Success create data", data));
//   } catch (error) {
//     console.error(error);
//     res.status(500).sedn(defaultMessage(500, "Error", error));
//   }
// };
