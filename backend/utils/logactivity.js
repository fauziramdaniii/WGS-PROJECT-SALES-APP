// services/LogService.js
const { LogActivity } = require('../models/logactivity'); // Corrected path

async function logActivity(data) {
  try {
    await LogActivity.create(data);
    console.log('Activity logged:', data);
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

module.exports = {
  logActivity,
};
