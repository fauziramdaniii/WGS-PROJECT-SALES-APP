import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import useUserStore from '../../../stores/user/AddUserStore'

const AddUserFormModal = ({ isOpen, onClose, onSubmit }) => {
  const initialUserData = {
    username: '',
    email: '',
    roles: '',
    fullname: '',
    city: ''
  }

  const [userData, setUserData] = useState(initialUserData)

  const { createUser } = useUserStore()

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      const response = await createUser(userData)

      if (response.status === 201) {
        new Swal({
          title: 'Created!',
          text: 'New user has been created.',
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
    setUserData({
      username: '',
      email: '',
      roles: '',
      fullname: '',
      city: ''
    })
    onClose()
  }

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className='row'>
            <div className='col-md-6'>
              <Form.Group className='mb-3' controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  placeholder='Enter Username'
                  autoFocus
                  value={userData.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Enter Email'
                  value={userData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className='col-md-6'>
              <Form.Group className='mb-3' controlId='roles'>
                <Form.Label>Roles</Form.Label>
                <Form.Select
                  name='roles'
                  value={userData.roles}
                  onChange={handleChange}
                >
                  <option value=''>Select Role</option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='mb-3' controlId='fullname'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type='text'
                  name='fullname'
                  placeholder='Enter Full Name'
                  value={userData.fullname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  name='city'
                  placeholder='Enter City'
                  value={userData.city}
                  onChange={handleChange}
                />
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

export default AddUserFormModal
