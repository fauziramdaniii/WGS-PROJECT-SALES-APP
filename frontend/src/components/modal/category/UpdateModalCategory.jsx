// UpdateModalCategory.jsx
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const UpdateModalCategory = ({ isOpen, onClose, onUpdate, categoryData }) => {
  const [updatedData, setUpdatedData] = useState(categoryData || {})

  useEffect(() => {
    setUpdatedData(categoryData || {})
  }, [categoryData])

  const handleChange = e => {
    const { name, value } = e.target
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onUpdate(categoryData.id, updatedData)
    onClose()
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formCategoryName'>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category name'
              name='name'
              value={updatedData.name || ''}
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

export default UpdateModalCategory
