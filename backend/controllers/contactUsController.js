// controllers/contactUsController.js
const nodemailer = require('nodemailer');
const { ContactUs } = require('../models/contactus');
const { User } = require('../models/user')

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

// const adminEmail = '220434007@fellow.lpkia.ac.id';

// Create ContactUs
const createContactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContactUs = await ContactUs.create({
      name,
      email,
      message,
    });

    // Fetch admin's email from the database based on the role
    const adminUser = await User.findOne({ roles: 'admin' });

    if (!adminUser) {
      console.error('Admin user not found');
      return res.status(500).json({ error: 'Admin user not found' });
    }

    const adminEmail = adminUser.email;

    // Send email to admin
    const mailOptions = {
      from: '220434007@fellow.lpkia.ac.id',
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