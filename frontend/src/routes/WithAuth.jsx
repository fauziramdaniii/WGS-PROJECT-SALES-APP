// WithAuth
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const withAuth = WrappedComponent => {
  const WithAuth = props => {
    const navigate = useNavigate()

    useEffect(() => {
      const token = localStorage.getItem('token')
      const roles = localStorage.getItem('roles')

      console.log(token)
      console.log(roles)

      if (!token || !roles) {
        navigate('/login')
      }
    }, [navigate])

    return <WrappedComponent {...props} />
  }

  return WithAuth
}

export default withAuth
