// auth.jsx
import { useState } from 'react'
import apiService from '../../utils/apiService'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const useAuthStores = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const postLogin = async () => {
    try {
      const response = await apiService.byPostData('auth/login', {
        email,
        password
      })

      if (response.status === 200) {
        localStorage.setItem('token', response.data.result.token)
        localStorage.setItem('expiredToken', response.data.result.expiredToken)

        Swal.fire({
          title: 'HI Welcome Back!',
          text: response.data.message,
          icon: 'success',
          timer: 2000
        })

        console.log(response.data)
        const userRole = response.data.result.roles
        switch (userRole) {
          case 'superadmin':
            navigate('/superadmin')
            break
          case 'admin':
            navigate('/admin')
            break
          default:
            navigate('/')
        }
      } else if (response.response.status === 401) {
        Swal.fire({
          title: 'Error!',
          text: response.response.data.message,
          icon: 'error'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    postLogin()
  }

  const logout = () => {
    const token = localStorage.getItem('token')
    const expiredToken = localStorage.getItem('expiredToken')

    const response = apiService.byPostData('auth/logout', {})
    console.log(response)
    if (token || expiredToken) {
      apiService
        .byPostData('auth/logout', { token })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('expiredToken')

          Swal.fire({
            title: 'Logged Out!',
            text: 'You have been successfully logged out.',
            icon: 'success'
          })

          navigate('/login')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  // const logout = () => {
  //   localStorage.removeItem('token')
  //   navigate('/login')
  //   Swal.fire({
  //     title: 'Logged Out!',
  //     text: 'You have been successfully logged out.',
  //     icon: 'success'
  //   })
  // }

  return { postLogin, handleSubmit, setEmail, setPassword, logout }
}

export default useAuthStores
