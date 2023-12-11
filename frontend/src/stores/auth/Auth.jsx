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
            navigate('/')
            break
          case 'admin':
            navigate('/admin')
            break
          default:
            navigate('/home')
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

  return { postLogin, handleSubmit, setEmail, setPassword }
}

export default useAuthStores
