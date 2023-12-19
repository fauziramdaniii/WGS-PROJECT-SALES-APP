import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import './notfound.scss'

const NotFound = () => {
  const roles = localStorage.getItem('roles')

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    border: 'none',
    outline: 'none',
    textDecoration: 'none'
  }

  const handlingHome = () => {
    if (roles === 'user') {
      return (
        <Link to='/' style={buttonStyle}>
          Back To Home
        </Link>
      )
    } else if (roles === 'admin') {
      return (
        <Link to='/admin' style={buttonStyle}>
          Back To Home
        </Link>
      )
    } else if (roles === 'superadmin') {
      return (
        <Link to='/superadmin' style={buttonStyle}>
          Back To Home
        </Link>
      )
    }
    return null
  }

  return (
    <div className='container'>
      <img
        src='https://img.freepik.com/premium-vector/page-found-404-design-error-page-icon-vector-illustration-outline-filled-design-development-style-icon_7280-8554.jpg'
        alt='404 Not Found'
      />
      <div>{handlingHome()}</div>
    </div>
  )
}

export default NotFound
