// UpdateModalCategory.jsx
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const UpdateModalTerm = ({ isOpen, onClose, onUpdate, termData }) => {
  const [updatedData, setUpdatedData] = useState(termData || {})

  useEffect(() => {
    setUpdatedData(termData || {})
  }, [termData])

  const handleChange = e => {
    const { name, value } = e.target
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onUpdate(termData.id, updatedData)
    onClose()
  }

  return (
    <Modal show={isOpen} onHide={onClose} className='modal-xl'>
      <Modal.Header closeButton>
        <Modal.Title>Update Term And Condition</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Title'
              name='title'
              value={updatedData.title || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId='content'>
            <Form.Label>Content</Form.Label>
            <ReactQuill
              value={updatedData.content || ''}
              onChange={value =>
                setUpdatedData({ ...updatedData, content: value })
              }
              placeholder='Enter Content'
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

export default UpdateModalTerm
