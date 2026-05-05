'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TermConditions', [
      {
        title: 'Syarat & Ketentuan Pemesanan',
        content: `
          <h4>Syarat dan Ketentuan</h4>
          <p>Dengan melakukan pemesanan, Anda menyetujui ketentuan berikut:</p>
          <ol>
            <li>Pesanan yang telah dikonfirmasi tidak dapat dibatalkan kecuali dalam kondisi tertentu.</li>
            <li>Pembayaran dilakukan secara tunai saat pengambilan barang di toko.</li>
            <li>Barang wajib diambil dalam <strong>2x24 jam</strong> setelah pemesanan. Pesanan yang melewati batas waktu akan otomatis dibatalkan dan stok dikembalikan.</li>
            <li>Pastikan data pemesanan yang Anda masukkan sudah benar sebelum mengkonfirmasi.</li>
            <li>Stok produk bersifat terbatas dan dapat berubah sewaktu-waktu.</li>
            <li>Pihak toko berhak membatalkan pesanan apabila terjadi kesalahan harga atau stok tidak tersedia.</li>
          </ol>
          <p>Hubungi kami jika ada pertanyaan lebih lanjut. Terima kasih telah berbelanja!</p>
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TermConditions', null, {});
  },
};
