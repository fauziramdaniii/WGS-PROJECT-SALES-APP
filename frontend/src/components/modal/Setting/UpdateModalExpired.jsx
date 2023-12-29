// UpdateModalExpired.jsx
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const UpdateModalExpired = ({ isOpen, onClose, onUpdate, expiredOrder }) => {
  const [updatedData, setUpdatedData] = useState(expiredOrder || {})

  useEffect(() => {
    setUpdatedData(expiredOrder || {})
  }, [expiredOrder])

  const handleChange = e => {
    const { expiredOrder, value } = e.target

    // Format the date to match the expected format "yyyy-MM-dd HH:mm:ss.SSSZ"
    const formattedDate = new Date(value).toISOString().slice(0, 23) + '+07:00'

    setUpdatedData(prevData => ({
      ...prevData,
      [expiredOrder]: formattedDate
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onUpdate(expiredOrder.id, updatedData)
    onClose()
  }

  return (
    <Modal show={isOpen} onHide={onClose} className='modal-xl'>
      <Modal.Header closeButton>
        <Modal.Title>Update Term And Condition</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='expiredOrder'>
            <Form.Label>Date and Time</Form.Label>
            <Form.Control
              type='datetime-local' // Use datetime-local input type
              name='expiredOrder'
              value={updatedData.expiredOrder || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' type='submit' onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateModalExpired
