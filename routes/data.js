const express = require("express");
const router = express.Router();
const {
    data_pemohon, data_pekerjaan, data_pasangan, data_pekerjaan_pasangan,
    data_penjamin, data_pekerjaan_penjamin, data_pasangan_penjamin,
    data_pekerjaan_pasangan_penjamin, data_kontak_darurat
} = require("../models");

router.get("/", async (req, res) => {
    try {
        const result = await Promise.all([
            data_pemohon.findAll(),
            data_pekerjaan.findAll(),
            data_pasangan.findAll(),
            data_pekerjaan_pasangan.findAll(),
            data_penjamin.findAll(),
            data_pekerjaan_penjamin.findAll(),
            data_pasangan_penjamin.findAll(),
            data_pekerjaan_pasangan_penjamin.findAll(),
            data_kontak_darurat.findAll(),
        ]);
        res.json({
            pemohon: result[0],
            pekerjaan: result[1],
            pasangan: result[2],
            pekerjaan_pasangan: result[3],
            penjamin: result[4],
            pekerjaan_penjamin: result[5],
            pasangan_penjamin: result[6],
            pekerjaan_pasangan_penjamin: result[7],
            kontak_darurat: result[8],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;



// const controller = require('../controllers/multiDataController');

// router.get('/alldata/:application_id/:nik', controller.getAllData);
// router.post('/alldata', controller.insertAllData);
// router.put('/alldata/:application_id/:nik', controller.updateAllData);
