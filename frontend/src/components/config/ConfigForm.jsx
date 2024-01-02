// ConfigForm.js
import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Modal, Form } from 'react-bootstrap'
import useSettingStores from '../../stores/setting/useSettingStores'
import ChangePasswordCard from '../modal/Setting/ChangePasswordCard'

const ConfigForm = () => {
  const [config, setConfig] = useState({})
  const [cancellationTimeoutDays, setCancellationTimeoutDays] = useState('')
  const [showModal, setShowModal] = useState(false)

  const { getCanceledStatus, updateCanceledStatus } = useSettingStores()

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

  useEffect(() => {
    getConfig() // Dipanggil sekali saat komponen dimuat
  }, [])

  const handleUpdateConfig = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleUpdate = async () => {
    try {
      if (parseInt(cancellationTimeoutDays, 10) < 0) {
        // Display an error message or handle the negative value as needed
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
    <Container
      className='mt-2'
      style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}
    >
      <div>
        <h2 className='mb-2 text-left'>App Configuration</h2>
        <Card style={{ maxWidth: '400px', justifyContent: 'left' }}>
          <Card.Body>
            <div>
              <h3>Config Cancel Order</h3>
              <p>Cancellation Order: {config.cancellation_timeout_days} Day</p>
            </div>
            <Button variant='primary' onClick={handleUpdateConfig}>
              Update
            </Button>
          </Card.Body>
        </Card>
      </div>

      <ChangePasswordCard />

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
    </Container>
  )
}

export default ConfigForm
