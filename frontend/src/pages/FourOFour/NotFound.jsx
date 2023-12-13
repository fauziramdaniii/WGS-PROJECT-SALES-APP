import React from 'react'
import { Link } from 'react-router-dom'
import './notfound.scss'

const NotFound = () => {
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

  return (
    <div className='container'>
      <img
        src='https://img.freepik.com/premium-vector/page-found-404-design-error-page-icon-vector-illustration-outline-filled-design-development-style-icon_7280-8554.jpg'
        alt='404 Not Found'
      />
      <div>
        <Link to='/' style={buttonStyle}>
          Back To Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
