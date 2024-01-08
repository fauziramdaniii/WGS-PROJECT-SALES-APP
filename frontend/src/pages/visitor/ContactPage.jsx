import React, { useState } from 'react'
import Footer from '../../components/visitor/Footer'
import Navbar from '../../components/visitor/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:3000/api/contactUs',
        formData
      )
      if (response && response.status === 201) {
        Swal.fire({
          title: 'Sent!',
          text: 'Your message will be follow up.',
          icon: 'success',
          timer: 4000
        })
      } else {
        console.log(response)
      }

      // Reset the form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <>
      <Navbar />
      <div className='container my-3 py-3'>
        <h1 className='text-center'>Contact Us</h1>
        <hr />
        <div className='row my-4 h-100'>
          <div className='col-md-4 col-lg-4 col-sm-8 mx-auto'>
            <form onSubmit={handleSubmit}>
              <div className='form my-3'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter your name'
                />
              </div>
              <div className='form my-3'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='name@example.com'
                />
              </div>
              <div className='form my-3'>
                <label htmlFor='message'>Message</label>
                <textarea
                  rows={5}
                  className='form-control'
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Enter your message'
                />
              </div>
              <div className='text-center'>
                <button
                  className='my-2 px-4 mx-auto btn btn-dark'
                  type='submit'
                  disabled={
                    !formData.name || !formData.email || !formData.message
                  }
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ContactPage
