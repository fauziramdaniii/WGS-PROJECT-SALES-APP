import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import useTermAndConditionStores from '../../../stores/termCondition/TermAndConditionStores'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AddModalTerm = ({ isOpen, onClose, onSubmit }) => {
  const dataTermAndCondition = {
    title: '',
    content: ''
  }

  const [termAndCondition, setTermAndCondition] = useState(dataTermAndCondition)

  const { createTerm } = useTermAndConditionStores()

  const handleChange = e => {
    setTermAndCondition({
      ...termAndCondition,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      const response = await createTerm(termAndCondition)

      if (response.status === 201) {
        new Swal({
          title: 'Created!',
          text: 'New Term Condition Has Been created.',
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
    setTermAndCondition({
      title: '',
      content: ''
    })
    onClose()
  }

  return (
    <Modal show={isOpen} onHide={handleClose} className='modal-xl'>
      <Modal.Header closeButton>
        <Modal.Title>Add Term And Condition</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className='row'>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter Title'
                autoFocus
                value={termAndCondition.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='content'>
              <Form.Label>Content</Form.Label>
              <ReactQuill
                value={termAndCondition.content}
                onChange={value =>
                  setTermAndCondition({ ...termAndCondition, content: value })
                }
                placeholder='Enter Content'
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

export default AddModalTerm
