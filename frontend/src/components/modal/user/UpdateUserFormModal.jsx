// UpdateUserFormModal.jsx
import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import useUserStore from '../../../stores/user/AddUserStore'

const UpdateUserFormModal = ({ isOpen, onClose, onSubmit, userData }) => {
  const [updatedUserData, setUpdatedUserData] = useState(userData || {})

  useEffect(() => {
    setUpdatedUserData(userData || {})
  }, [userData])

  const handleChange = e => {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.name]: e.target.value
    })
  }

  const handleErrorResponse = error => {
    const responseData = error?.response?.data

    if (responseData) {
      if (responseData.error) {
        Swal.fire({
          title: 'Error',
          text: responseData.error,
          icon: 'error'
        })
      } else if (
        Array.isArray(responseData.errors) &&
        responseData.errors.length > 0
      ) {
        const errorMessage = responseData.errors
          .map(err => `${err.msg} (${err.path})`)
          .join('\n')

        Swal.fire({
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

  const handleUpdate = async () => {
    try {
      const response = await onSubmit(updatedUserData)

      if (response && response.status === 200) {
        Swal.fire({
          title: 'Updated!',
          text: 'User information has been updated.',
          icon: 'success'
        })
        onClose()
      } else {
        handleErrorResponse(response)
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
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

              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='Enter Password'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
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
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateUserFormModal
