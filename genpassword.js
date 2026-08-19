const bcrypt = require("bcrypt");
const XLSX = require("xlsx");

const usernames = [
  "f_rizal",
  "dedy_kurniawan",
  "oki_s",
  "ulil_azmi",
  "andri_saputra",
  "zulfikar_azmi",
  "iksan_setiady",
  "imam_saneta",
  "hieronymus_ferdhian",
  "deri_efriansyah",
  "kevin_rizaldy",
  "n_falah",
  "david_h",
  "evelin_natva",
  "nanda_a",
  "thjang_i",
  "christina_a",
  "dwi_a",
  "deny_anton",
  "raka_arief",
  "aria_tama",
  "joko_purnomo",
  "suhendri_setiawan",
  "andre_karyono",
  "ihsan_dev",
  "ardi_mahardika",
  "fauzan_akbar",
  "tami_triyadi",
  "razi_fazlurrahman",
  "pebi_alsyabani",
  "afdal_risky",
  "firman_nugraha",
  "fajar_sidik",
  "fauzan_arfas",
  "ahmad_redo",
  "c_denny",
  "nur_shodik",
  "brandon_achen",
  "roni_islamiyanto",
  "ardian_kusuma",
  "lukman_aji",
  "made_sumadiyasa",
  "anggie_eka",
  "made_hadi",
  "dwi_sanjaya",
  "edwin_h",
  "ricco_t",
  "chrease_h",
  "user_df_2",
  "user_df_1",
  "m_riki",
  "testing9fff",
  "testing3",
  "g_prastiwi",
  "deo",
  "freddy_s",
  "oki_it",
  "dwi_cahyo",
  "rully_r",
  "v_laura",
  "adit_r",
  "andez",
  "accounting",
  "nurul_a",
  "dea_a",
  "thomas_d",
  "sastra_hamidjaja",
  "indra_hartanto",
  "dian_andrianza",
  "farid_m",
  "iing",
  "resnu_aditya",
  "tauhid_rinaldi",
  "hendrik_m",
  "lembar_f",
  "benny_f",
  "agus_setiawan",
  "cmo_salman"
];

function generatePassword(length = 8) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return password;
}

(async () => {
  const rows = [];

  for (const username of usernames) {
    const password = generatePassword(8);
    const hash = await bcrypt.hash(password, 10);

    rows.push({
      Username: username,
      Password_Asli: password,
      Hash: hash,
    });
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Users"
  );

  XLSX.writeFile(workbook, "user_passwords.xlsx");

  console.log(
    `Selesai! File user_passwords.xlsx berhasil dibuat.`
  );
})();