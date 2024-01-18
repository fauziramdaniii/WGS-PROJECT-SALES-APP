import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'

const ChangePasswordModal = ({ show, onClose }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const API_URL = `${import.meta.env.VITE_API_URL}`

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setPasswordsMatch(false)
        return
      }

      const userId = localStorage.getItem('id_user') // Assuming you store userId in localStorage
      await axios.post(`${API_URL}auth/change-password/${userId}`, {
        oldPassword,
        newPassword
      })

      // Handle success or display a success message
      console.log('Password changed successfully')

      onClose() // Close the modal after a successful password change
    } catch (error) {
      // Handle errors or display an error message
      console.error('Error changing password:', error)
    }
  }

  const handleConfirmPasswordChange = e => {
    const confirmInputValue = e.target.value
    setConfirmPassword(confirmInputValue)

    // Check if the passwords match and update the state
    setPasswordsMatch(newPassword === confirmInputValue)
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='oldPassword'>
            <Form.Label>Old Password:</Form.Label>
            <Form.Control
              type='password'
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='newPassword'>
            <Form.Label>New Password:</Form.Label>
            <Form.Control
              type='password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm New Password:</Form.Label>
            <Form.Control
              type='password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              isInvalid={!passwordsMatch}
            />
            {!passwordsMatch && (
              <Form.Control.Feedback type='invalid'>
                Passwords do not match.
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={handleChangePassword}
          disabled={!passwordsMatch}
        >
          Change Password
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChangePasswordModal
