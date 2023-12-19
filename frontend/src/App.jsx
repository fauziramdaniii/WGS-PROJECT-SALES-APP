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

  console.log(userRole + ' ie ayaan sih')

  // if (userRole === null) {
  //   return <>Loading...</>
  // }

  return (
    <div className='App'>
      <Router>
        <Routes>
          {/* Redirect to Login if userRole or token is null */}
          {/* <Route
            path='/'
            element={
              userRole ? (
                <Navigate to={`/${userRole}`} />
              ) : (
                <Navigate to='/login' />
              )
            }
          /> */}

          {/* Login */}
          <Route path='login' element={<Login />} />

          {/* Protected Routes User*/}
          <Route
            path='/*'
            element={
              <ProtectedRoute
                Component={Visitor}
                userRole='user'
                userRoleCtx={userRole}
              />
            }
          />
          {/* Protected Routes Admin*/}
          <Route
            path='admin/*'
            element={
              <ProtectedRoute
                Component={Admin}
                userRole='admin'
                userRoleCtx={userRole}
              />
            }
          />

          {/* Protected Routes Superadmin*/}
          <Route
            path='/superadmin/*'
            element={
              <ProtectedRoute
                Component={Superadmin}
                userRole='superadmin'
                userRoleCtx={userRole}
              />
            }
          />

          {/* NotFound */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

// const ProtectedRoute = withAuth(({ Component, userRole, userRoleCtx }) => {
//   console.log('protectedRoute ', userRoleCtx)
//   if (!userRoleCtx) {
//     return <Navigate to='/login' />
//   }

//   return userRole == userRoleCtx ? <Component /> : <NotFound />
// })

// Wrap the ProtectedRoute component with withAuth HOC
const ProtectedRoute = withAuth(({ Component, userRole, userRoleCtx }) => {
  const storedUserRoleFromLocalStorage = localStorage.getItem('roles')

  if (!storedUserRoleFromLocalStorage) {
    return <Navigate to='/login' />
  }
  return userRole == storedUserRoleFromLocalStorage ? (
    <Component />
  ) : (
    <NotFound />
  )
})
export default App
