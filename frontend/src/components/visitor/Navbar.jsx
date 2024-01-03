import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import useAuthStores from '../../stores/auth/Auth'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const token = localStorage.getItem('token')
  const id_user = localStorage.getItem('id_user')
  const cartItems = useSelector(state => state.cart.cartItems)

  const { logout } = useAuthStores()

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top'>
      <div className='container'>
        <NavLink className='navbar-brand fw-bold fs-4 px-2' to='/'>
          <img
            src='../../../src/assets/logo.png'
            alt=''
            srcSet=''
            style={{ height: '50px' }}
          />
        </NavLink>
        <button
          className='navbar-toggler mx-2'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav m-auto my-2 text-center'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/product'>
                Products
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/about'>
                About
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/contact'>
                Contact
              </NavLink>
            </li>
          </ul>
          <div className='buttons text-center'>
            {token && id_user ? (
              <>
                <NavLink
                  to='/logout'
                  className='btn btn-outline-dark m-2'
                  onClick={logout}
                >
                  <i className='fa fa-sign-out-alt mr-1'></i> Logout
                </NavLink>
                <NavLink to='/dashboard' className='btn btn-outline-dark m-2'>
                  <i className='fa fa-user-plus mr-1'></i> Dashboard
                </NavLink>
              </>
            ) : (
              <NavLink to='/login' className='btn btn-outline-dark m-2'>
                <i className='fa fa-sign-in-alt mr-1'></i> Login
              </NavLink>
            )}
            <NavLink to='/cart' className='btn btn-outline-dark m-2'>
              <i className='fa fa-cart-shopping mr-1'></i> Cart (
              {cartItems.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
