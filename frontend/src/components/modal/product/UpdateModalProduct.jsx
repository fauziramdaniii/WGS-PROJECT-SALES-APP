// UpdateModalProduct.jsx
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import useCategoryStore from '../../../stores/category/CategoryStore'

const UpdateModalProduct = ({ isOpen, onClose, onUpdate, productData }) => {
  const [updatedData, setUpdatedData] = useState(productData || {})
  const [categories, setCategories] = useState([])
  const [imageFile, setImageFile] = useState(null)

  const { getCategory } = useCategoryStore()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory()
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    setUpdatedData(productData || {})
    fetchCategories()
  }, [productData])

  const handleChange = e => {
    const { name, value } = e.target
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    console.log(file)
    setImageFile(file)
  }

  const handleSubmit = e => {
    e.preventDefault()
    onUpdate(productData.id, updatedData, imageFile) // Pass the imageFile to the onUpdate function
    onClose()
  }

  return (
    <Modal show={isOpen} onHide={onClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className='row'>
            <div className='col-md-6'>
              <Form.Group controlId='name' className='mb-3'>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Product Name'
                  name='name'
                  value={updatedData.name || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId='price' className='mb-3'>
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Product Price'
                  name='price'
                  value={updatedData.price || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId='image' className='mb-3'>
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

            <div className='col-md-6'>
              <Form.Group controlId='description' className='mb-3'>
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Product Description'
                  name='description'
                  value={updatedData.description || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId='stock' className='mb-3'>
                <Form.Label>Product stock</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Product stock'
                  name='stock'
                  value={updatedData.stock || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='id_category'>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  name='id_category'
                  onChange={handleChange}
                  value={updatedData.id_category}
                >
                  <option>Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
        <Button variant='primary' type='submit' onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateModalProduct
