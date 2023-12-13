// app.jsx
import Login from './pages/login/Login'
import NotFound from './pages/FourOFour/NotFound'
import Superadmin from './routes/Superadmin'
// Routes
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const tipeUser = { user: 'user', admin: 'admin', superadmin: 'superadmin' }
const currentType = tipeUser.superadmin

function App () {
  return (
    <div className='App'>
      <Router>
        <div style={{ display: 'flex', gap: '12', padding: '8' }}>
          <Link to='/superadmin'>superadmin</Link>
          <Link to='/admin'>Admin</Link>
          <Link to='/'>User</Link>
          <div>You Are Login As: {currentType}</div>
        </div>
        <AppRoutes />
      </Router>
    </div>
  )
}

import React from 'react'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      {currentType === tipeUser.user ? (
        <>
          <Route path='/' element={<UserElement />}>
            <Route index element={<User />} />
          </Route>
        </>
      ) : null}

      {currentType === tipeUser.admin ? (
        <>
          <Route path='admin' element={<AdminElement />}>
            <Route index element={<Admin />} />
          </Route>
        </>
      ) : null}

      {currentType === tipeUser.superadmin ? (
        <>
          <Route path='superadmin/*' element={<SuperadminElement />}>
            <Route index element={<Superadmin />} />
          </Route>
        </>
      ) : null}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

const Admin = () => {
  return <div>Admin</div>
}

const User = () => {
  return <div>User</div>
}

const UserElement = () => {
  if (currentType === tipeUser.user) {
    return <User />
  } else {
    return <NotFound />
  }
}

const AdminElement = () => {
  if (currentType === tipeUser.admin) {
    return <Admin />
  } else {
    return <NotFound />
  }
}

const SuperadminElement = () => {
  if (currentType === tipeUser.superadmin) {
    return <Superadmin />
  } else {
    return <NotFound />
  }
}

export default App
