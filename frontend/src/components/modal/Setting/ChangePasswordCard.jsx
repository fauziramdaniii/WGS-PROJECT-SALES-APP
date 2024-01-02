import React, { useState } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import ChangePasswordModal from './ChangePasswordModal' // Assuming you have a separate modal component

const ChangePasswordCard = () => {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Card
        style={{
          maxWidth: '400px',
          justifyContent: 'left',
          marginTop: '45px'
        }}
      >
        <Card.Body>
          <div>
            <h3>Change Password</h3>
            <p>Update your password</p>
          </div>
          <Button variant='primary' onClick={handleOpenModal}>
            Change Password
          </Button>
        </Card.Body>
      </Card>

      <ChangePasswordModal show={showModal} onClose={handleCloseModal} />
    </>
  )
}

export default ChangePasswordCard
