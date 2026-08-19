const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true }); // scan sekali saja di terminal
});

client.on('ready', () => {
  console.log('WhatsApp client is ready!');

  // Kirim pesan otomatis saat siap
  const nomorTujuan = '628111558680@c.us'; // ubah ke nomor pribadi kamu
  const pesan = '✅ Bot aktif! Siap mengirim notifikasi perubahan database.';

  client.sendMessage(nomorTujuan, pesan);
});

// Fungsi kirim pesan yang bisa kamu panggil dari luar
module.exports.sendWA = (number, message) => {
  const formatted = number.includes('@c.us') ? number : `${number}@c.us`;
  client.sendMessage(formatted, message);
};

client.initialize();