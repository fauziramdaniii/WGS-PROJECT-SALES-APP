import React, { useState } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import ChangePasswordModal from './ChangePasswordModal'

const ChangePasswordCard = () => {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className='col-md-6'>
      {' '}
      {/* Use Bootstrap responsive grid class */}
      <Card>
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
    </div>
  )
}

export default ChangePasswordCard
