import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/visitor/Footer'
import Navbar from '../../components/visitor/Navbar'
import Order from './Order'
import ChangePassword from './ChangePassword'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('order')

  const handleTabChange = tab => {
    setActiveTab(tab)
  }

  const Sidebar = () => {
    return (
      <div className='sidebar'>
        <div
          className={`sidebar-tab ${activeTab === 'order' ? 'active' : ''}`}
          onClick={() => handleTabChange('order')}
        >
          <NavLink to='/dashboard/order' className='btn btn-outline-dark mx-4'>
            See My Order <i className='fa fa-arrow-right'></i>
          </NavLink>
        </div>
        <div
          className={`sidebar-tab ${
            activeTab === 'change-password' ? 'active' : ''
          }`}
          onClick={() => handleTabChange('change-password')}
        >
          <NavLink
            to='/dashboard/change-password'
            className='btn btn-outline-dark mx-4'
            style={{ marginTop: '20px' }}
          >
            Change Password <i className='fa fa-arrow-right'></i>
          </NavLink>
        </div>
      </div>
    )
  }

  const ViewDashboard = () => {
    return (
      <div className='container my-1 py-1'>
        <h2 className='text-center'>My Dashboard</h2>
        <hr />
        <div className='row'>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <div className='container'>
              {activeTab === 'order' && (
                <div className='row'>
                  <div className='col-md-12 bg-light text-center'>
                    <Order />
                  </div>
                </div>
              )}
              {activeTab === 'change-password' && (
                <div className='row'>
                  <div className='col-md-12'>
                    <h2>Change Password</h2>
                    <ChangePassword />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      {<ViewDashboard />}
      <Footer />
    </>
  )
}

export default Dashboard
