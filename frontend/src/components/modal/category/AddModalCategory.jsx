import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import useCategoryStore from '../../../stores/category/CategoryStore'

const AddModalCategory = ({ isOpen, onClose, onSubmit }) => {
  const dataCategory = {
    name: '',
    image: ''
  }

  const [category, setCategory] = useState(dataCategory)
  const [imageFile, setImageFile] = useState(null)

  const { createCategory } = useCategoryStore()

  const handleChange = e => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    console.log(file)
    setImageFile(file)
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append('name', category.name)
      formData.append('image', imageFile)

      const response = await createCategory(formData)

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
            <Form.Group className='mb-3' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='file'
                name='image'
                accept='image/*' // Allow only image files
                encType='multipart/form-data'
                onChange={handleImageChange}
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
