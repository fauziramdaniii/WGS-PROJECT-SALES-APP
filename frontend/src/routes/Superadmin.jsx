import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/admin/home/Home'
import Login from '../pages/login/Login'
import List from '../pages/admin/lists/List'
import Single from '../pages/admin/single/Single'
import New from '../pages/admin/new/New'
import { userInputs } from '../pages/admin/new/formSource'

const Superadmin = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route index element={<List />} />
      <Route path=':userId' element={<Single />} />
      <Route
        path='new'
        element={<New inputs={userInputs} title='Add New User' />}
      />
    </Routes>
  )
}

export default Superadmin
