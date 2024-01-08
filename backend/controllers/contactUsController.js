// controllers/contactUsController.js
const nodemailer = require('nodemailer');
const { ContactUs } = require('../models/contactus');

const transporter = nodemailer.createTransport({
     service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: 'fauziramdhan38@gmail.com', // Your email address
          pass: 'gskeghxoroktwmsg' // Your email password or an application-specific password
        },
        tls: {
          rejectUnauthorized: true
        }
      });

const adminEmail = '220434007@fellow.lpkia.ac.id';

// Create ContactUs
const createContactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContactUs = await ContactUs.create({
      name,
      email,
      message,
    });

    // Kirim email ke admin
    const mailOptions = {
      from: '220434007@fellow.lpkia.ac.id',  // Ganti dengan email pengirim
      to: adminEmail,
      subject: 'New ContactUs Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    return res.status(201).json(newContactUs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all ContactUs
const getContactUs = async (req, res) => {
  try {
    const contactUsList = await ContactUs.findAll();
    return res.status(200).json(contactUsList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    createContactUs,
    getContactUs
}