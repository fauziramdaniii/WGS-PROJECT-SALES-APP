// ChangePassword.js
import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Password and confirm password do not match.')
      return
    }

    // Ganti "USER_ID" dengan id pengguna yang sesuai
    const userId = localStorage.getItem('id_user')
    const API_URL = `${import.meta.env.VITE_API_URL}`

    try {
      const response = await axios.post(
        `${API_URL}auth/change-password/${userId}`,
        {
          oldPassword,
          newPassword
        }
      )
      const messageSuccess = response.data.message
      // Handle response dari server
      Swal.fire({
        title: 'Success!',
        text: messageSuccess,
        icon: 'success'
      })

      setError('')
    } catch (error) {
      // Handle error dari server
      console.error('internal serve error', error.message)
      setError('Failed to change password. Please check your old password.')
    }
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor='oldPassword'>Old Password:</label>
        <input
          type='password'
          id='oldPassword'
          className='form-control'
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='newPassword'>New Password:</label>
        <input
          type='password'
          id='newPassword'
          className='form-control'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <input
          type='password'
          id='confirmPassword'
          className='form-control'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className='btn btn-outline-dark mx-4'
        style={{ marginTop: '20px' }}
        onClick={handleChangePassword}
      >
        Change Password
      </button>
    </div>
  )
}

export default ChangePassword
