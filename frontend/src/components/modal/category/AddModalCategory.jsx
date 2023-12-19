import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import useCategoryStore from '../../../stores/category/CategoryStore'

const AddModalCategory = ({ isOpen, onClose, onSubmit }) => {
  const dataCategory = {
    name: ''
  }

  const [category, setCategory] = useState(dataCategory)

  const { createCategory } = useCategoryStore()

  const handleChange = e => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      const response = await createCategory(category)

      if (response.status === 201) {
        new Swal({
          title: 'Created!',
          text: 'New Category Has Been created.',
          icon: 'success'
        })
        handleClose()
      } else {
        handleErrorResponse(response)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleErrorResponse = error => {
    const responseData = error.response?.data

    if (responseData) {
      if (responseData.error) {
        new Swal({
          title: 'Error',
          text: responseData.error,
          icon: 'error'
        })
      } else if (
        Array.isArray(responseData.errors) &&
        responseData.errors.length > 0
      ) {
        const errorMessage = responseData.errors
          .map(error => `${error.msg} (${error.path})`)
          .join('\n')

        new Swal({
          title: 'Error',
          text: errorMessage,
          icon: 'error'
        })
      } else {
        console.error('Unexpected response format:', error)
      }
    } else {
      console.error('Unexpected response format:', error)
    }
  }

  const handleClose = () => {
    setCategory({
      name: ''
    })
    onClose()
  }

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className='row'>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter Category Name'
                autoFocus
                value={category.name}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddModalCategory
