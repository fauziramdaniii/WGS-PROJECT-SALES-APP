// App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './pages/FourOFour/NotFound'
import Superadmin from './routes/Superadmin'
import Admin from './routes/Admin'
import Visitor from './routes/Visitor'
import withAuth from './routes/WithAuth'
import Login from './pages/login/Login'
import { Navigate } from 'react-router-dom'

function App () {
  return (
    <div className='App'>
      <Router>
        <Routes>
          {/* Login */}
          <Route path='login' element={<Login />} />

          {/* Public Routes */}
          <Route path='/*' element={<Visitor />} />

          {/* Protected Routes Admin */}
          <Route
            path='admin/*'
            element={<ProtectedRoute Component={Admin} userRole='admin' />}
          />

          {/* Protected Routes Superadmin */}
          <Route
            path='/superadmin/*'
            element={
              <ProtectedRoute Component={Superadmin} userRole='superadmin' />
            }
          />

          {/* NotFound */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

const ProtectedRoute = withAuth(({ Component, userRole }) => {
  const storedUserRoleFromLocalStorage = localStorage.getItem('roles')

  if (!storedUserRoleFromLocalStorage) {
    // Redirect to login if no user role is found
    return <Navigate to='/login' />
  }

  return userRole === storedUserRoleFromLocalStorage ? (
    <Component />
  ) : (
    // Redirect to NotFound if user role doesn't match
    <Navigate to='/404' />
  )
})

export default App
