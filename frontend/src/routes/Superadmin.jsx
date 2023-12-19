import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/superadmin/home/Home'
import List from '../pages/superadmin/lists/List'
import Single from '../pages/superadmin/single/Single'
import New from '../pages/superadmin/new/New'
import { userInputs } from '../pages/superadmin/new/formSource'
import withAuth from './WithAuth'

const Superadmin = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='users'>
        <Route index element={<List />} />
        <Route path=':userId' element={<Single />} />
        <Route
          path='new'
          element={<New inputs={userInputs} title='Add New User' />}
        />
      </Route>
    </Routes>
  )
}

export default withAuth(Superadmin)
