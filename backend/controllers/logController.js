const { LogActivity } = require('../models/logactivity');

const getLog = async (req, res) => {
  try {
    const logs = await LogActivity.findAll({
      attributes: ['id', 'timestamp', 'activityType', 'user', 'details', 'status', 'ipAddress'],
      order: [['timestamp', 'DESC']], // Urutkan berdasarkan timestamp secara descending (terbaru dulu)
    });

    // Format timestamp menjadi string tanggal, waktu, dan hari
    const formattedLogs = logs.map(log => {
      const logDate = new Date(log.timestamp);
      const formattedDate = logDate.toLocaleDateString();
      const formattedTime = logDate.toLocaleTimeString();
      const dayOfWeek = logDate.toLocaleDateString('id-ID', { weekday: 'long' });

      return {
        id: log.id,
        timestamp: `${formattedDate} ${formattedTime} (${dayOfWeek})`,
        activityType: log.activityType,
        user: log.user,
        details: log.details,
        status: log.status,
        ipAddress: log.ipAddress,
      };
    });

    res.status(200).json(formattedLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getLog };
