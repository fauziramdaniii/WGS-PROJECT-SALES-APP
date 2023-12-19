// ResetPasswordModal.jsx
import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import useUserStore from '../../stores/user/AddUserStore'

const ResetPasswordModal = ({
  isOpen,
  onClose,
  onResetPassword,
  initialEmail
}) => {
  const { resetPassword } = useUserStore()
  const [email, setEmail] = useState(initialEmail || '')
  // Gunakan useEffect untuk menangani perubahan initialEmail
  useEffect(() => {
    setEmail(initialEmail || '')
  }, [initialEmail])

  const handleResetPassword = async () => {
    try {
      const result = await resetPassword(email)
      if (result.message === 'Password reset successfully') {
        Swal.fire({
          title: 'Password Reset',
          text: 'Password has been reset successfully.',
          icon: 'success'
        })
        onResetPassword(email)
        onClose()
      } else {
        console.error('Error resetting password:', result)
      }
    } catch (error) {
      console.error('Error resetting password:', error)
    }
  }

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formEmail'>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleResetPassword}>
          Reset Password
        </Button>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ResetPasswordModal
