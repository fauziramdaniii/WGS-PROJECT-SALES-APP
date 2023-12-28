// Package Required
const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const nodemailer = require('nodemailer')
const { logActivity } = require('../utils/logactivity')

// Import Validator From Dir Validator
const {
  createUserValidator,
  updateUserValidator
} = require('../validator/userValidator') 


// Function CRUD
const UserController = {
  createUser: [
    ...createUserValidator,
    async (req, res) => {
      try {
        const { username, email, password, roles, fullname, city } = req.body

        // Check if email already exists in the database
        const existingUser = await User.findOne({
          where: {
            email: email.toLowerCase()
          }
        })

        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' })
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user with the hashed password
        const newUser = await User.create({
          username,
          email: email.toLowerCase(),
          password: hashedPassword,
          roles,
          fullname,
          city
        })

        const userResponse = {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          roles: newUser.roles,
          fullname: newUser.fullname,
          city: newUser.city
          // Add other fields as needed
        }

        sendNewUserByEmail(newUser.email, userResponse, password)

        await logActivity({
        timestamp: new Date(),
        activityType: 'Add User',
        user: 'id_user',
        details: 'Add User',
        ipAddress: req.ip,
        device: req.headers['user-agent'],
        status: 'Success',
    });
    
        res.status(201).json(userResponse)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
      function sendNewUserByEmail (email, userData, password) {
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
        })
  
        const mailOptions = {
          from: 'framdhan26@gmail.com',
          to: email,
          subject: 'New User Registration',
          html: `
        <p>Hello, ${userData.fullname}</p>
        <p>Your account has been successfully registered with the following details:</p>
        <p>Email: <strong>${userData.email}</strong></p>
        <p>Password: <strong>${password}</strong></p>
        <p>Roles: <strong>${userData.roles}</strong></p>
        <p>Please ensure to change your password after logging in for security reasons. Thank you for registering with us.</p>
        <p>Best regards,</p>
        <p>Sales App WGS Bootcamp</p>
      `
        }
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error)
          } else {
            console.log('Email sent: ' + info.response)
          }
        })
      }
    },
  ],

  updateUser: [
    ...updateUserValidator,
    async (req, res) => {
      const userId = req.params.id
      console.log('Request body:', req.body)

      try {
        // Check if the user exists
        const existingUser = await User.findByPk(userId)

        if (!existingUser) {
          return res.status(404).json({ error: 'User not found' })
        }

        // Hash the password if it is included in the request body
        if (req.body.password) {
          req.body.password = await bcrypt.hash(req.body.password, 10)
        }

        // Update the user
        const [updatedCount] = await User.update(req.body, {
          where: { id: userId }
        })

        console.log(updatedCount)

        if (updatedCount > 0) {
          res.status(200).json({ message: 'User updated successfully' })
        } else {
          res.status(500).json({ error: 'Failed to update user' })
        }
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  ],

  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        where: {
          roles: {
            [Op.notLike]: '%superadmin%',
          }
        }
      })
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id
    try {
      const user = await User.findByPk(userId)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id
    try {
      const deletedCount = await User.destroy({
        where: { id: userId }
      })
      if (deletedCount > 0) {
        res.status(200).json({ message: 'User deleted successfully' })
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email } = req.body

      // Generate a new password
      const newPassword = generateRandomPassword()

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // Update user password in the database
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      user.password = hashedPassword
      await user.save()

      // Send the new password to the user's email
      sendNewPasswordByEmail(email, newPassword)

      return res.status(200).json({ message: 'Password reset successfully' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    function generateRandomPassword () {
      const length = 10
      const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let password = ''

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        password += charset[randomIndex]
      }

      return password
    }

    function sendNewPasswordByEmail (email, newPassword) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
          user: 'fauziramdhan38@gmail.com', // Your email address
          pass: 'gskeghxoroktwmsg' // Your email password or an application-specific password
        },
        tls: {
          rejectUnauthorized: true
        }
      })

      const mailOptions = {
        from: 'framdhan26@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        html: `
        <p>Hello,</p>
        <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
        <p>Your new password is: <strong>${newPassword}</strong></p>
        <p>Please ensure to change your password after logging in for security reasons.</p>
        <p>Thank you,</p>
        <p>Your Application Name Team</p>
      `
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
    }
  }
}

module.exports = UserController
