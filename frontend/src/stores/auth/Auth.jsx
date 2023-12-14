// Auth.jsx
import { useState, useContext } from 'react'
import apiService from '../../utils/apiService'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext'

const useAuthStores = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const postLogin = async () => {
    try {
      const response = await apiService.byPostData('auth/login', {
        email,
        password
      })

      if (response.status === 200) {
        const { roles, token, expiredToken } = response.data.result

        // Update the context value with the userRole
        authContext.setUserRole(roles)

        // Store userRole, token, and expiredToken in local storage
        localStorage.setItem('roles', roles)
        localStorage.setItem('token', token)
        // localStorage.setItem('expiredToken', expiredToken)

        Swal.fire({
          title: 'HI Welcome Back!',
          text: response.data.message,
          icon: 'success',
          timer: 2000
        })

        // Redirect based on userRole
        switch (roles) {
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

    if (token || expiredToken) {
      apiService
        .byPostData('auth/logout', { token })
        .then(() => {
          // Clear user role, token, and expiredToken from local storage and context
          localStorage.removeItem('roles')
          localStorage.removeItem('token')
          localStorage.removeItem('expiredToken')
          authContext.setUserRole(null)

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

  return { postLogin, handleSubmit, setEmail, setPassword, logout }
}

export default useAuthStores