// ConfigForm.js
import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Modal, Form } from 'react-bootstrap'
import useSettingStores from '../../stores/setting/useSettingStores'
import useTermAndConditionStores from '../../stores/termCondition/TermAndConditionStores'
import ChangePasswordCard from '../modal/Setting/ChangePasswordCard'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const ConfigForm = () => {
  const [config, setConfig] = useState({})
  const [cancellationTimeoutDays, setCancellationTimeoutDays] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [terms, setTerms] = useState([])
  const [showTermModal, setShowTermModal] = useState(false)
  const [termId, setTermId] = useState(null)
  const [termTitle, setTermTitle] = useState('')
  const [termContent, setTermContent] = useState('')

  const { getCanceledStatus, updateCanceledStatus } = useSettingStores()
  const { getTerm, updateTerm } = useTermAndConditionStores()
  // Fungsi untuk mendapatkan konfigurasi
  const getConfig = async () => {
    try {
      const response = await getCanceledStatus()
      console.log(response)
      setConfig(response.data.data)
    } catch (error) {
      console.error('Error fetching config:', error)
    }
  }
  const handleUpdateTerm = (id, title, content) => {
    setTermId(id)
    setTermTitle(title)
    setTermContent(content)
    setShowModal(true)
  }

  const handleUpdateTermFunction = async () => {
    try {
      const updatedTerm = {
        title: termTitle,
        content: termContent
      }

      const response = await updateTerm(1, updatedTerm)

      if (response.status === 200) {
        console.log('Term updated successfully:', response.data)
        // You can optionally show a success message to the user
      } else {
        console.error('Update term request failed:', response.data)
      }

      setShowTermModal()
      getTerm()
    } catch (error) {
      console.error('Error updating term:', error)
    }
  }

  useEffect(() => {
    const getTerms = async () => {
      try {
        const responses = await getTerm() // Replace with your actual API call
        const firstTerm = responses.data[0]
        console.log(firstTerm)
        if (firstTerm) {
          setTermId(firstTerm.id)
          setTermTitle(firstTerm.title)
          setTermContent(firstTerm.content)
        }
      } catch (error) {
        console.error('Error fetching terms:', error)
      }
    }

    getTerms()
  }, [])

  useEffect(() => {
    getConfig() // Dipanggil sekali saat komponen dimuat
  }, [])

  const handleUpdateConfig = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  // handle update config cancelation time
  const handleUpdate = async () => {
    try {
      if (parseInt(cancellationTimeoutDays, 10) < 0) {
        console.error('Invalid input: Cancellation Timeout cannot be negative')
        return
      }

      await updateCanceledStatus(cancellationTimeoutDays)
      getConfig()
      handleCloseModal()
    } catch (error) {
      console.error('Error updating config:', error)
    }
  }

  return (
    <Container className='mt-2'>
      <h2 className='mb-4 text-center'>App Configuration</h2>

      {/* Use Bootstrap responsive grid classes for layout */}
      <div className='row justify-content-center'>
        <div className='col-md-6 mb-4'>
          <Card>
            <Card.Body>
              <div>
                <h3>Config Cancel Order</h3>
                <p>
                  Cancellation Order: {config.cancellation_timeout_days} Day
                </p>
              </div>
              <Button variant='primary' onClick={handleUpdateConfig}>
                Update
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className='col-md-6 mb-4'>
          <Card>
            <Card.Body>
              <div>
                <h3>Config Term And Condition</h3>
                <p>Open Update For Show Term Condition</p>
              </div>
              <Button variant='primary' onClick={() => setShowTermModal(true)}>
                Update
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className='row'>
        {/* Move ChangePasswordCard outside of the grid */}
        <ChangePasswordCard />
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='cancellationTimeoutDays'>
              <Form.Label>Cancellation Timeout (days):</Form.Label>
              <Form.Control
                type='number'
                value={cancellationTimeoutDays}
                onChange={e => {
                  const inputValue = e.target.value
                  if (/^\d+$/.test(inputValue) || inputValue === '') {
                    setCancellationTimeoutDays(inputValue)
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* for config term and condition */}
      <Modal
        show={showTermModal}
        onHide={() => setShowTermModal(false)}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='termTitle'>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type='text'
                value={termTitle}
                onChange={e => setTermTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='termContent'>
              <Form.Label>Content:</Form.Label>
              <ReactQuill
                value={termContent || ''}
                onChange={content => setTermContent(content)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={async () => {
              await handleUpdateTermFunction() // Add await here
            }}
          >
            Update
          </Button>
          <Button variant='secondary' onClick={() => setShowTermModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ConfigForm
