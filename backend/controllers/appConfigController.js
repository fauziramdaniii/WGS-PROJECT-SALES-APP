// controllers/appConfigController.js
const { AppConfig } = require('../models/appconfig');

const appConfigController = {
  // Mengambil konfigurasi dari database. Jika tidak ada, membuat konfigurasi default.
  getConfig: async (req, res) => {
    try {
      let config = await AppConfig.findOne();

      // Jika tidak ada data konfigurasi, buat data baru dengan nilai default.
      if (!config) {
        config = await AppConfig.create({
          cancellation_timeout: 172800, // Default: 2 days in seconds
        });
      }

      // Konversi durasi dari detik ke hari untuk kemudahan pemahaman.
      const durationInDays = config.cancellation_timeout / (24 * 60 * 60);

      res.status(200).json({
        success: true,
        data: { ...config._doc, cancellation_timeout_days: durationInDays },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch configuration',
      });
    }
  },

  // Mengupdate konfigurasi dalam database berdasarkan input dari pengguna.
  updateConfig: async (req, res) => {
    const { cancellation_timeout_days } = req.body;

    try {
      let config = await AppConfig.findOne();

      // Jika tidak ada data konfigurasi, buat data baru dengan nilai input pengguna.
      if (!config) {
        config = await AppConfig.create({
          cancellation_timeout: cancellation_timeout_days * 24 * 60 * 60 * 1000, // Konversi hari ke milidetik
        });
      } else {
        // Jika data konfigurasi sudah ada, lakukan update nilai konfigurasi.
        await config.update({
          cancellation_timeout: cancellation_timeout_days * 24 * 60 * 60 * 1000, // Konversi hari ke milidetik
        });
      }

      // Tambahkan perhitungan konversi jika diperlukan untuk pemahaman nilai durasi.
      const durationInDays = cancellation_timeout_days;

      res.status(200).json({
        success: true,
        data: { ...config._doc, cancellation_timeout_days: durationInDays },
        message: 'Configuration updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to update configuration',
      });
    }
  },
};

module.exports = appConfigController;
