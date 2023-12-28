import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import useProductStore from '../../../stores/product/ProductStore'
import useCategoryStore from '../../../stores/category/CategoryStore'

const AddModalProduct = ({ isOpen, onClose, onSubmit }) => {
  const dataProduct = {
    name: '',
    price: '',
    image: '',
    description: '',
    stock: '',
    id_category: ''
  }

  const [product, setProduct] = useState(dataProduct)
  const [categories, setCategories] = useState([])
  const [imageFile, setImageFile] = useState(null)

  const { createProduct } = useProductStore()
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

    fetchCategories()
  }, [])

  const handleImageChange = e => {
    const file = e.target.files[0]
    console.log(file)
    setImageFile(file)
  }

  const handleChange = e => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('price', product.price)
      formData.append('description', product.description)
      formData.append('stock', product.stock)
      formData.append('id_category', product.id_category)
      formData.append('image', imageFile)

      const response = await createProduct(formData)

      if (response.status === 201) {
        new Swal({
          title: 'Created!',
          text: 'New Product Has Been created.',
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
    setProduct(dataProduct)
    onClose()
  }

  return (
    <Modal show={isOpen} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className='row'>
            <div className='col-md-6'>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Enter Product Name'
                  autoFocus
                  value={product.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='text'
                  name='price'
                  placeholder='Enter Product Price'
                  autoFocus
                  value={product.price}
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
            <div className='col-md-6'>
              <Form.Group className='mb-3' controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  name='description'
                  placeholder='Enter Product description'
                  autoFocus
                  value={product.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='stock'>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type='text'
                  name='stock'
                  placeholder='Enter Product Stock'
                  autoFocus
                  value={product.stock}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='id_category'>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  name='id_category'
                  onChange={handleChange}
                  value={product.id_category}
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

export default AddModalProduct
