// App.jsx
import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import AuthContext from './stores/auth/AuthContext'
import Login from './pages/login/Login'
import NotFound from './pages/FourOFour/NotFound'
import Superadmin from './routes/Superadmin'
import Admin from './routes/Admin'
import Visitor from './routes/Visitor'
import withAuth from './routes/WithAuth'

function App () {
  const { userRole } = useContext(AuthContext)

  return (
    <div className='App'>
      <Router>
        <Routes>
          {/* Redirect to Login if userRole or token is null */}
          <Route
            path='/'
            element={
              userRole ? (
                <Navigate to={`/${userRole}`} />
              ) : (
                <Navigate to='/login' />
              )
            }
          />

          {/* Login */}
          <Route path='login' element={<Login />} />

          {/* Protected Routes User*/}
          <Route
            path='user/*'
            element={<ProtectedRoute Component={Visitor} userRole='user' />}
          />

          {/* Protected Routes Admin*/}
          <Route
            path='admin/*'
            element={<ProtectedRoute Component={Admin} userRole='admin' />}
          />

          {/* Protected Routes Superadmin*/}
          <Route
            path='superadmin/*'
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

// Wrap the ProtectedRoute component with withAuth HOC
const ProtectedRoute = withAuth(({ Component, userRole }) => {
  const { userRole: contextUserRole } = useContext(AuthContext)

  if (!contextUserRole) {
    return <Navigate to='/login' />
  }

  return contextUserRole === userRole ? <Component /> : <NotFound />
})

export default App
